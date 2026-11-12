import { papers, awards, profile, faculty } from './publications-data.js?v=10';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const local = (value, lang) => value && typeof value === 'object' ? (value[lang] ?? value.en ?? '') : (value ?? '');
const tr = (lang, en, zh) => lang === 'zh' ? zh : en;
const chapters = [
  { route:'/intro', number:'01', name:{ en:'Intro', zh:'简介' } },
  { route:'/background', number:'02', name:{ en:'Background', zh:'背景' } },
  { route:'/publications', number:'03', name:{ en:'Publications', zh:'论文发表' } },
  { route:'/awards', number:'04', name:{ en:'Design Awards', zh:'设计获奖' } },
  { route:'/portfolio', number:'05', name:{ en:'Portfolio', zh:'作品集' } }
];
const external = (url, label) => `<a class="text-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;

function facultyText(value) {
  return String(value ?? '').split(/(Hailiang Wang|Wang Hailiang|Jiannong Cao|Cao Jiannong|H\. Wang|J\. Cao)/g).map(part => {
    const person = faculty.find(item => item.aliases.includes(part));
    return person ? `<a class="faculty-link" href="${esc(person.homepage)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>` : esc(part);
  }).join('');
}

function chapterIndex(route, lang) {
  return `<nav class="chapter-index" aria-label="${tr(lang, 'Explore the chapters', '浏览各个章节')}">
    <p class="index-kicker">${tr(lang, 'Continue exploring', '继续探索')}</p>
    <div class="chapter-index-links">${chapters.map(ch => `<a class="chapter-link" href="#${ch.route}" ${route === ch.route ? 'aria-current="page"' : ''}><small>${ch.number}</small><span>${esc(local(ch.name, lang))}</span><b aria-hidden="true">↗</b></a>`).join('')}</div>
  </nav>`;
}

function frame(route, number, title, kicker, lead, body, lang) {
  return `<article class="content-page editorial-page" data-page="${route.slice(1)}" lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
    <header class="page-header">
      <a class="back-forest" href="#/"><span aria-hidden="true">←</span> ${tr(lang, 'Back to the forest', '返回森林')}</a>
      <p class="eyebrow">${number} <span aria-hidden="true">/</span> ${esc(kicker)}</p>
      <h1 class="page-title">${esc(title)}</h1>
      ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
    </header>
    ${body}
    <footer class="page-footer">${chapterIndex(route, lang)}</footer>
  </article>`;
}

function intro(lang) {
  const interests = profile.researchInterests.map((item, index) => `<li class="interest-card"><span class="interest-number">0${index + 1}</span><h3>${esc(local(item.label, lang))}</h3><p>${esc(local(item.description, lang))}</p></li>`).join('');
  return frame('/intro', '01', tr(lang, 'Intro', '简介'), tr(lang, 'Research & design', '研究与设计'),
    tr(lang, 'Exploring how people express intentions, develop ideas, and work with AI.', '探索人们如何表达意图、发展想法，并与人工智能协作。'),
    `<section class="editorial-grid intro-copy">
      <div><p>${tr(lang, 'I am Han Huizi, a PhD student in Design at The Hong Kong Polytechnic University, focusing on human–AI interaction. My practice moves between human–AI interaction, design research, and interactive systems.', '我是 Han Huizi，目前是香港理工大学设计学院的设计学博士生，研究方向为人机交互。我的工作围绕人机交互、设计研究与交互系统展开。')}</p>
      <p>${tr(lang, 'I explore how people make sense of information and turn emerging ideas into concrete experiences. Through user study and prototyping, I investigate how systems can connect human intentions, knowledge, and everyday contexts.', '我关注人们如何理解信息，并将初步想法转化为具体体验。通过用户研究与原型制作，我探索交互系统如何连接人的意图、知识与日常情境。')}</p></div>
      <aside class="ink-note"><p class="eyebrow">${tr(lang, 'Current focus', '当前关注')}</p><h2>${tr(lang, 'Human–AI collaboration', '人机协作')}</h2><p>${tr(lang, 'Generative AI and augmented reality for knowledge and creative work, with attention to changing intentions and human agency.', '关注生成式人工智能与增强现实如何支持知识工作和创作，以及协作过程中不断变化的意图与人的自主性。')}</p></aside>
    </section>
    <section class="interests-section"><div class="section-heading"><p class="eyebrow">${tr(lang, 'Research interests', '研究兴趣')}</p><h2>${tr(lang, 'Questions I explore', '持续探索的方向')}</h2></div><ol class="interest-grid">${interests}</ol></section>
`, lang);
}

function timeline(items, lang) {
  return `<ol class="timeline">${items.map(item => `<li><time>${esc(local(item.date, lang))}</time><div><h3>${esc(local(item.degree || item.role, lang))}</h3><p class="timeline-place">${esc(local(item.institution, lang))}</p>${item.detail ? `<p class="timeline-detail">${facultyText(local(item.detail, lang))}</p>` : ''}${item.focus ? `<p class="timeline-focus">${tr(lang, 'Focus: ', '方向：')}${esc(local(item.focus, lang))}</p>` : ''}</div></li>`).join('')}</ol>`;
}

function skillsAndMethods(lang) {
  const methods = profile.skills.map(skill => `<li><h3>${esc(local(skill.title, lang))}</h3><p>${esc(local(skill.description, lang))}</p></li>`).join('');
  const tools = profile.toolGroups.map(group => `<div><dt>${esc(local(group.label, lang))}</dt><dd>${esc(local(group.tools, lang))}</dd></div>`).join('');
  return `<section class="skills-section" aria-labelledby="skills-title"><div class="section-heading"><h2 id="skills-title">${tr(lang, 'Skills', '技能')}</h2></div><ol class="methods-list">${methods}</ol><div class="tools-section"><p class="eyebrow">${tr(lang, 'Tools', '工具')}</p><dl class="tools-list">${tools}</dl></div></section>`;
}

function background(lang) {
  return frame('/background', '02', tr(lang, 'Background', '背景'), tr(lang, 'Education & experience', '教育与研究经历'),
    tr(lang, 'A path through industrial design, digital experiences, and human–computer interaction.', '从工业设计、数字体验走向人机交互研究。'),
    `<section><div class="section-heading"><p class="eyebrow">${tr(lang, 'Education', '教育背景')}</p></div>${timeline(profile.education, lang)}</section>
    <section><div class="section-heading"><p class="eyebrow">${tr(lang, 'Experience', '研究经历')}</p></div>${timeline(profile.experience, lang)}</section>
    ${skillsAndMethods(lang)}`, lang);
}

function authorLine(authors) {
  return authors.map(author => /^(H\. Han|Huizi Han)$/.test(author) ? `<strong>${esc(author)}</strong>` : esc(author)).join(', ');
}

function publicationItem(paper, lang) {
  const isReview = paper.status === 'under-review';
  return `<li class="publication${isReview ? ' publication-review' : ''}" data-publication="${paper.id}">
    <div class="pub-side"><span class="rank-badge${isReview ? ' status-review' : ''}">${esc(isReview ? tr(lang, 'Under review', '审稿中') : paper.rank)}</span>${paper.year ? `<time>${paper.year}</time>` : ''}</div>
    <div class="pub-main"><h2>${esc(paper.title)}</h2>${paper.authors.length ? `<p class="pub-authors">${authorLine(paper.authors)}</p>` : ''}<p class="pub-venue">${esc(local(paper.venue, lang))}</p>${paper.url ? external(paper.url, tr(lang, 'Publication record', '论文链接')) : ''}</div>
  </li>`;
}

function publications(lang) {
  return frame('/publications', '03', tr(lang, 'Publications', '论文发表'), tr(lang, 'Selected research', '研究成果'),
    tr(lang, 'Research across human–AI interaction, intelligent systems, and sensing.', '关于人机交互、智能系统与感知的研究。'),
    `<section class="publication-section"><div class="publication-key"><span>${tr(lang, 'Published work & under review', '已发表与审稿中的论文')}</span><span>2023—2026</span></div><ol class="publication-list">${papers.map(paper => publicationItem(paper, lang)).join('')}</ol></section>`, lang);
}

function awardsPage(lang) {
  const featured = awards.filter(award => award.featured).map(award => `<article class="award-feature" data-award="${award.id}">
    <div class="award-feature-copy"><h2 class="award-distinction">${esc(local(award.award, lang))}</h2><p class="award-competition"><strong>${esc(local(award.competition, lang))} · ${award.year}</strong></p>${external(award.url, tr(lang, 'Official award record', '官方获奖记录'))}</div>
    <div class="award-logo-wrap"><img src="${esc(award.logo)}" alt="${esc(local(award.logoAlt, lang))}" loading="lazy"></div>
  </article>`).join('');
  const gold = awards.filter(award => award.gold).map(award => `<article class="gold-award"><h3>${tr(lang, 'Gold Award', '金奖')}</h3><p class="award-competition"><strong>${esc(local(award.competition, lang))} · ${award.year}</strong></p></article>`).join('');
  const other = awards.filter(award => !award.featured && !award.gold).map(award => `<li><p><strong>${esc(local(award.competition, lang))} · ${award.year}</strong></p><span>${esc(local(award.award, lang))}</span></li>`).join('');
  return frame('/awards', '04', tr(lang, 'Design Awards', '设计获奖'), tr(lang, 'Recognition', '获奖记录'),
    tr(lang, 'Recognition in product design, digital art, and innovation.', '产品设计、数字艺术与创新设计领域的获奖记录。'),
    `<section class="featured-recognition" aria-label="${tr(lang, 'Featured awards', '主要奖项')}"><div class="award-feature-grid">${featured}</div></section>
    <section class="gold-recognition" aria-label="${tr(lang, 'Gold awards', '金奖')}">${gold}</section>
    <section class="other-recognition"><div class="section-heading"><p class="eyebrow">${tr(lang, 'Further recognition', '其他获奖')}</p></div><ol class="award-list">${other}</ol></section>`, lang);
}

function contact(lang, theme = 'day') {
  const scenePrefix = theme === 'night' ? 'contact-scene-night' : 'contact-scene';
  return frame('/contact', '↗', tr(lang, 'Contact', '联系我'), tr(lang, 'A conversation starts here', '交流与合作'), '',
    `<section class="contact-story"><div class="contact-copy"><p class="contact-person">Han Huizi</p><h2 class="contact-greeting">${tr(lang, 'Feel free to get in touch!', '欢迎联系我！')}</h2><p>${tr(lang, 'Always happy to exchange ideas and explore collaborations in human–AI interaction—from everyday tools to spatial experiences.', '很高兴与你交流想法，探索人机交互领域的合作机会，从日常工具到空间体验。')}</p><p>${tr(lang, 'Open to internship opportunities in HCI and UX research & design, bringing together user research, prototyping, and the exploration of emerging technologies.', '期待人机交互与用户体验研究、设计方向的实习机会，将用户研究、原型制作与新兴技术探索结合起来。')}</p><p class="contact-signoff">${tr(lang, 'Looking forward to hearing from you :D', '期待收到你的消息 :D')}</p></div><figure class="contact-portrait" data-contact-scene data-fox-state="person"><img class="contact-scene-base" src="assets/${scenePrefix}-person.png" width="1536" height="1024" alt="${tr(lang, 'Han Huizi and the forest fox beside a laptop in a paper meadow', 'Han Huizi 与森林狐狸坐在草地上，身旁放着电脑')}" loading="eager" draggable="false"><img class="contact-fox-frame contact-fox-computer" src="assets/${scenePrefix}-computer.png" width="1536" height="1024" alt="" aria-hidden="true" loading="eager" draggable="false"><img class="contact-fox-frame contact-fox-viewer" src="assets/${scenePrefix}-viewer.png" width="1536" height="1024" alt="" aria-hidden="true" loading="eager" draggable="false"></figure><div class="contact-details"><div class="contact-email-block"><p class="eyebrow">${tr(lang, 'Email', '邮箱')}</p><a class="contact-email" href="mailto:${profile.email}">${profile.email}<span aria-hidden="true">↗</span></a></div><p class="contact-location">${esc(local(profile.locations, lang))}</p><p class="contact-affiliation">${esc(local(profile.role, lang))}<br>${esc(local(profile.school, lang))} · ${esc(local(profile.institution, lang))}</p></div></section>`, lang);
}

export function renderContentPage(route, lang = 'en', theme = 'day') {
  const language = lang === 'zh' ? 'zh' : 'en';
  const pages = { '/intro':intro, '/background':background, '/publications':publications, '/awards':awardsPage, '/contact':contact };
  return pages[route] ? pages[route](language, theme) : '';
}
