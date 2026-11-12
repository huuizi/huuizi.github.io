// Publication details follow the supplied CV; CHI EA ’26 follows the final paper.
// Ranking labels retain the classifications displayed on the original website.
export const papers = [
  {
    id: 'litbridge', year: null, status: 'under-review', rank: null,
    title: 'LitBridge: Restructuring the Dynamic Interplay between Fine-Grained Literature Content and Research Construction during Scholarly Reading',
    authors: [], venue: { en: 'Manuscript under review', zh: '论文审稿中' }, url: null
  },
  {
    id: 'from-studio-to-academia', year: 2026, rank: 'CCF-A',
    title: 'From the Studio to Academia: Design and Evaluation of a Knowledge-Augmented GenAI System to Empower Design Undergraduates’ Design Research Writing',
    authors: ['Wenchen Guo', 'Yiyang Zhang', 'Huizi Han', 'Hailiang Wang'],
    venue: 'CHI EA ’26: Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems',
    url: 'https://doi.org/10.1145/3772363.3799095'
  },
  {
    id: 'beyond-predefined-interactions', year: 2025, rank: 'CCF-A',
    title: 'Beyond Predefined Interactions: Enhancing Gesture-Based Flexible Robot Interaction through Air-Writing and Large Models Inference',
    authors: ['H. Han', 'W. He', 'W. Ren', 'J. Cao'],
    venue: 'CHI EA ’25: Extended Abstracts of the CHI Conference on Human Factors in Computing Systems',
    url: 'https://doi.org/10.1145/3706599.3719864'
  },
  {
    id: 'liquidauth', year: 2025, rank: 'CCF-C',
    title: 'LiquidAuth: Reliable and Accurate Liquid Authentication Using GAN-enhanced Acoustic-to-Mass-Spectrum Mapping',
    authors: ['Juncen Zhu', 'Huizi Han', 'Jiannong Cao', 'Julie McCann', 'Ho-Yin Michael Ma', 'Xiaoyun Liu'],
    venue: 'ICCCN 2025, Tokyo, Japan', url: 'https://ieeexplore.ieee.org/document/11134008'
  },
  {
    id: 'mod-yolo', year: 2024, rank: 'JCR Q1',
    title: 'MOD-YOLO: Rethinking the YOLO architecture at the level of feature information and applying it to crack detection',
    authors: ['P. Su', 'H. Han', 'M. Liu', 'T. Yang', 'S. Liu'],
    venue: 'Expert Systems with Applications, 237, 121346',
    url: 'https://doi.org/10.1016/j.eswa.2023.121346'
  },
  {
    id: 'tracking-aided-respiration', year: 2023, rank: 'JCR Q1',
    title: 'Tracking-Aided Respiration Detection Using Radar During Large-Scale Body Movements',
    authors: ['W. Ren', 'H. Han', 'S. Chang', 'Q. Liu'],
    venue: 'IEEE Sensors Journal, 23(15), 17187–17199',
    url: 'https://doi.org/10.1109/JSEN.2023.3287358'
  },
  {
    id: 'mmdrive', year: 2023, rank: 'JCR Q2',
    rankBasis: { en: '2023 JCR data', zh: '2023 年 JCR 数据' },
    rankSource: 'https://www.acm.org/binaries/content/assets/about/annual-reports/f24-pubs-annual-report.pdf',
    title: 'mmDrive: Fine-Grained Fatigue Driving Detection Using mmWave Radar',
    authors: ['J. Zhu', 'J. Cao', 'Y. Yang', 'W. Ren', 'H. Han'],
    venue: 'ACM Transactions on Internet of Things, 4(4), Article 26',
    url: 'https://doi.org/10.1145/3614437'
  }
];

export const awards = [
  {
    id: 'red-dot', year: 2025, featured: true,
    award: { en: 'Red Dot Award', zh: '红点奖' },
    competition: { en: 'Red Dot Award: Design Concept', zh: '红点设计概念奖' },
    url: 'https://www.red-dot.org/project/water-cube-82964',
    logo: 'assets/43389361-04ef-447c-bfb6-58ab186c913a.png',
    logoAlt: { en: 'Red Dot Winner 2025', zh: '2025 红点奖获奖标志' }
  },
  {
    id: 'epda', year: 2024, featured: true,
    award: { en: 'Top Design Winner', zh: '最佳设计奖' },
    competition: { en: 'European Product Design Award', zh: '欧洲产品设计奖' },
    url: 'https://www.productdesignaward.eu/winners/epda/2024/12064/',
    logo: 'assets/9b103808-6ad5-49bc-9f03-d2a3853e0f09.png',
    logoAlt: { en: 'European Product Design Award 2024 Top Design', zh: '2024 欧洲产品设计奖最佳设计获奖标志' }
  },
  { id: 'hk-gold', year: 2024, gold: true, award: { en: 'Gold', zh: '金奖' }, competition: { en: 'Hong Kong Digital Art & Design Competition', zh: '香港数字艺术设计大赛' } },
  { id: 'fa-gold', year: 2023, gold: true, award: { en: 'Gold', zh: '金奖' }, competition: { en: 'FA International Frontier Innovation Design Competition', zh: 'FA 国际前沿创新设计大赛' } },
  { id: 'hk-bronze', year: 2024, award: { en: 'Bronze Award', zh: '铜奖' }, competition: { en: 'Hong Kong Digital Art & Design Competition', zh: '香港数字艺术设计大赛' } },
  { id: 'icad-silver', year: 2023, award: { en: 'Silver Award', zh: '银奖' }, competition: { en: 'ICAD International Art & Design Competition', zh: 'ICAD 国际艺术设计大赛' } },
  { id: 'icad-excellence', year: 2022, award: { en: 'Excellence Award', zh: '优秀奖' }, competition: { en: 'ICAD International Art and Design Competition', zh: 'ICAD 国际艺术设计大赛' } },
  { id: 'fa-bronze', year: 2022, award: { en: 'Bronze Award', zh: '铜奖' }, competition: { en: 'FA International Frontier Innovation Design Competition', zh: 'FA 国际前沿创新设计大赛' } },
  { id: 'xingshi', year: 2018, award: { en: 'Excellence Award', zh: '优秀奖' }, competition: { en: 'Xing-shi Cup International Industrial Design Competition', zh: '“醒狮杯”国际工业设计大赛' } }
];

// Official faculty profiles verified on 18 October 2026.
export const faculty = [
  {
    aliases: ['Hailiang Wang', 'Wang Hailiang', 'H. Wang'],
    homepage: 'https://www.polyu.edu.hk/sd/people/academic-staff/wang-hailiang/'
  },
  {
    aliases: ['Jiannong Cao', 'Cao Jiannong', 'J. Cao'],
    homepage: 'https://www.polyu.edu.hk/comp/people/academic-staff/prof-cao-jiannong/'
  }
];

export const profile = {
  role: { en: 'PhD student in Design (Human–AI Interaction)', zh: '设计学博士生（人机交互方向）' },
  institution: { en: 'The Hong Kong Polytechnic University', zh: '香港理工大学' },
  school: { en: 'School of Design', zh: '设计学院' },
  email: '25142498r@connect.polyu.hk',
  locations: { en: 'Hong Kong · Shenzhen', zh: '香港 · 深圳' },
  researchInterests: [
    {
      label: { en: 'Human–AI interaction', zh: '人机交互' },
      description: { en: 'How people work with generative AI while retaining agency over research, design, and creative work.', zh: '探索人们如何在研究、设计与创作中和生成式人工智能协作，并保持对工作过程的自主性。' }
    },
    {
      label: { en: 'Human intent modeling', zh: '人类意图建模' },
      description: { en: 'How people express and refine changing intentions, and how interactive systems can respond to them.', zh: '探索人们如何表达和细化不断变化的意图，以及交互系统如何理解并回应这些意图。' }
    },
    {
      label: { en: 'Collaborative interaction systems', zh: '协同交互系统' },
      description: { en: 'Tools that connect evidence, ideas, and action, including knowledge work and augmented reality interfaces.', zh: '探索连接证据、想法与行动的交互工具，关注知识工作与增强现实界面。' }
    }
  ],
  skills: [
    {
      title: { en: 'User Research & Evaluation', zh: '用户研究与评估' },
      description: { en: 'Investigating user needs and evaluating interactive systems through user studies.', zh: '通过用户研究探索用户需求，并评估交互系统。' }
    },
    {
      title: { en: 'Product & Interaction Design', zh: '产品与交互设计' },
      description: { en: 'Designing products and digital experiences, with a focus on multimodal and human–AI interaction.', zh: '设计产品与数字体验，重点关注多模态交互与人机交互。' }
    },
    {
      title: { en: 'Prototyping & Technical Integration', zh: '原型制作与技术集成' },
      description: { en: 'Building digital and physical prototypes that integrate software, hardware, and AI models. Using AI-assisted coding to support prototyping.', zh: '构建融合软件、硬件与人工智能模型的数字原型和实体原型，并使用人工智能辅助编程支持原型制作。' }
    }
  ],
  toolGroups: [
    { label: { en: '3D', zh: '三维' }, tools: { en: 'Rhino · KeyShot', zh: 'Rhino · KeyShot' } },
    { label: { en: 'UI & UX', zh: 'UI 与用户体验' }, tools: { en: 'Adobe XD · Webflow', zh: 'Adobe XD · Webflow' } },
    { label: { en: 'Graphics & Media', zh: '平面与媒体' }, tools: { en: 'Photoshop · Illustrator · Premiere Pro', zh: 'Photoshop · Illustrator · Premiere Pro' } },
    { label: { en: 'Specialized Tools', zh: '专业工具' }, tools: { en: 'Audacity · TI mmWave Studio', zh: 'Audacity · TI mmWave Studio' } },
    { label: { en: 'AI-assisted workflows', zh: 'AI 辅助工作流' }, tools: { en: 'Research & writing · Coding & prototyping · Visual exploration', zh: '研究与写作 · 编程与原型制作 · 视觉探索' } }
  ],
  education: [
    {
      date: { en: 'Jan 2026 — present', zh: '2026 年 1 月 — 至今' },
      degree: { en: 'PhD in Design (Human–AI Interaction)', zh: '设计学博士（人机交互方向）' },
      institution: { en: 'The Hong Kong Polytechnic University', zh: '香港理工大学' },
      focus: { en: 'Generative AI–assisted AR interaction', zh: '生成式人工智能辅助的增强现实交互' },
      detail: { en: 'School of Design · Supervisor: Prof. Hailiang Wang · Co-supervisor: Prof. Jiannong Cao', zh: '设计学院 · 导师：Hailiang Wang 教授 · 联合导师：Jiannong Cao 教授' }
    },
    { date: { en: 'Oct 2021 — Jul 2023', zh: '2021 年 10 月 — 2023 年 7 月' }, degree: { en: 'MSc in Digital Design and Branding', zh: '数字设计与品牌理学硕士' }, institution: { en: 'Brunel University London', zh: '伦敦布鲁内尔大学' }, focus: { en: 'Front-end development · UX design · Branding & marketing', zh: '前端开发 · 用户体验设计 · 品牌与营销' } },
    { date: { en: 'Sep 2016 — Jun 2020', zh: '2016 年 9 月 — 2020 年 6 月' }, degree: { en: 'BEng in Industrial Design', zh: '工业设计工学学士' }, institution: { en: 'Yanshan University', zh: '燕山大学' }, focus: { en: 'User research · Industrial product design · Ergonomics', zh: '用户研究 · 工业产品设计 · 人机工程学' } }
  ],
  experience: [
    { date: { en: 'Jan 2023 — Jan 2025', zh: '2023 年 1 月 — 2025 年 1 月' }, role: { en: 'Research Assistant', zh: '研究助理' }, focus: { en: 'Human sensing · Human–robot interaction', zh: '人体感知 · 人与机器人交互' }, institution: { en: 'The Hong Kong Polytechnic University', zh: '香港理工大学' }, detail: { en: 'Department of Computing · Supervisor: Prof. Jiannong Cao', zh: '电子计算学系 · 导师：Jiannong Cao 教授' } }
  ]
};
