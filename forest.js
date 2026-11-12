import { TREES, MOBILE_TREES, NIGHT_TREES, MOBILE_NIGHT_TREES, IDLE_POSES, clamp, dockFor, planRoute, makeTrack, pointOnTrack, treeInFront, depthScale } from './forest-motion.js?v=13';
const sprites=[['stand','fox-stand-complete'],['sit','fox-approved-sit'],['sniff','fox-approved-sniff'],...[1,2,3,4].map(i=>['gait-'+i,'fox-quadruped-'+i])];
export function mountForest(root,{navigate,lang='en',theme='day'}){
 const name=t=>lang==='zh'?t.zh:t.en;
 root.innerHTML=`<div class="forest-world"><div class="forest-art forest-day" aria-hidden="true"></div><div class="forest-art forest-night" aria-hidden="true"></div><div class="fox-runner" data-pose="stand" aria-hidden="true"><div class="fox-orientation">${sprites.map(([id,file])=>`<img class="fox-sprite ${id==='stand'?'active':''}" data-sprite="${id}" src="assets/${file}.png" alt="" draggable="false">`).join('')}</div></div>${TREES.map((t,i)=>`<div class="tree-occluder tree-mask-${i+1}" data-mask="${i}" aria-hidden="true"><div class="forest-art forest-day"></div><div class="forest-art forest-night"></div></div>`).join('')}<nav class="forest-paths" aria-label="${lang==='zh'?'选择森林中的一条小径':'Choose a path through the forest'}">${TREES.map((t,i)=>`<a class="tree-path" href="#${t.path}" data-tree="${i}" data-route="${t.path}"><span class="tree-label">${name(t)}</span></a>`).join('')}</nav></div><div class="forest-top-mist" aria-hidden="true"></div>`;
 const world=root.querySelector('.forest-world'),fox=root.querySelector('.fox-runner');
 const masks=[...root.querySelectorAll('[data-mask]')],links=[...root.querySelectorAll('[data-tree]')];
 const images=new Map([...root.querySelectorAll('[data-sprite]')].map(x=>[x.dataset.sprite,x]));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let width=1,height=1,actorSize=1,mobile=false,trees=TREES,bounds=[7,93];
 let point={x:62,y:88},track=[],travel=0,speed=0,frame=0,last=0,active=-1,dock=null,settledDock=null,cycle=0,currentSprite='stand',direction=1,destroyed=false,moving=false;
 function setSprite(id){if(id===currentSprite)return;images.get(currentSprite)?.classList.remove('active');images.get(id)?.classList.add('active');currentSprite=id;fox.dataset.sprite=id}
 function draw(){
  fox.style.left=point.x+'%';fox.style.top=point.y+'%';fox.style.setProperty('--direction',direction);
  fox.style.setProperty('--depth-scale',depthScale(point,trees).toFixed(3));
  masks.forEach((mask,i)=>mask.classList.toggle('occludes',treeInFront(trees[i],point)));
  fox.dataset.footX=point.x.toFixed(2);fox.dataset.footY=point.y.toFixed(2);
 }
 function finish(){
  moving=false;speed=0;frame=0;last=0;point={x:dock.x,y:dock.y};direction=dock.direction;
  fox.classList.remove('is-moving');fox.dataset.pose=dock.pose;fox.dataset.side=String(dock.side);
  settledDock={...dock};setSprite(dock.pose);draw();
  // Advance only after a complete stop. Passing over other trees while travelling
  // does not consume unseen poses, so all poses get their turn.
  cycle=(cycle+1)%IDLE_POSES.length;
 }
 function tick(now){
  if(destroyed)return;
  const dt=Math.min((now-last)/1000||.016,.04);last=now;
  const remaining=track.at(-1).distance-travel;
  const desired=Math.min(mobile?actorSize*1.7:height*.43,Math.sqrt(Math.max(0,remaining)*1000));
  speed+=clamp(desired-speed,-900*dt,720*dt);
  travel=Math.min(track.at(-1).distance,travel+Math.max(25,speed)*dt);
  const next=pointOnTrack(track,travel);
  if(Math.abs(next.x-point.x)>.006)direction=next.x>point.x?1:-1;
  point=next;setSprite('gait-'+(1+Math.floor(travel/(actorSize*.20))%4));draw();
  if(travel>=track.at(-1).distance-.3)finish();else frame=requestAnimationFrame(tick);
 }
 function select(index,force=false){
  if(reduced||index===active&&!force)return;
  const departure=!moving?settledDock:null;
  const sameStop=departure?.index===index;
  const side=sameStop?departure.side:point.x<trees[index].x?-1:point.x>trees[index].x?1:dock?.side||trees[index].side;
  active=index;dock=dockFor(index,IDLE_POSES[cycle],actorSize/width*100,bounds,{side,trees});
  track=makeTrack(planRoute(point,dock,bounds,trees,{departure:sameStop?null:departure}),width,height);travel=0;last=0;moving=true;
  fox.dataset.pose='walk';fox.dataset.destination=String(index);fox.dataset.cycle=String(cycle);fox.classList.add('is-moving');
  links.forEach(a=>a.classList.toggle('is-active',Number(a.dataset.tree)===index));
  if(!frame)frame=requestAnimationFrame(tick);
 }
 function nearest(x){return trees.map((t,i)=>({...t,i})).reduce((a,b)=>Math.abs(a.x-x)<Math.abs(b.x-x)?a:b).i}
 function pointer(e){if(e.pointerType==='touch')return;const a=e.target.closest('[data-tree]'),r=root.getBoundingClientRect();select(a?Number(a.dataset.tree):nearest((e.clientX-r.left)/width*100))}
 function touch(e){if(e.pointerType!=='touch'||e.target.closest('a'))return;const r=root.getBoundingClientRect();select(nearest((e.clientX-r.left)/width*100),true)}
 function enter(e){if(e.pointerType!=='touch')select(Number(e.currentTarget.dataset.tree),!moving)}
 function focus(e){select(Number(e.currentTarget.dataset.tree),true)}
 function click(e){e.preventDefault();navigate(e.currentTarget.dataset.route)}
 function leave(){active=-1}
 function resize(){
  const r=root.getBoundingClientRect();width=r.width;height=r.height;mobile=width<=600;trees=mobile?(theme==='night'?MOBILE_NIGHT_TREES:MOBILE_TREES):(theme==='night'?NIGHT_TREES:TREES);
  actorSize=mobile?Math.min(height*.14,width*.22):height*.256;
  root.dataset.layout=mobile?'portrait':'landscape';world.style.width=width+'px';world.style.left='0';
  fox.style.width=fox.style.height=actorSize+'px';const margin=actorSize*.73/width*100;bounds=[margin,100-margin];
  links.forEach((a,i)=>{a.style.setProperty('--tree-x',trees[i].x+'%');a.style.setProperty('--label-y',trees[i].labelY+'%')});
  point.x=clamp(point.x,...bounds);
  if(dock){dock=dockFor(dock.index,dock.pose,actorSize/width*100,bounds,{side:dock.side,trees});
   if(moving){track=makeTrack(planRoute(point,dock,bounds,trees),width,height);travel=0}
   else{point={x:dock.x,y:dock.y};direction=dock.direction;fox.dataset.side=String(dock.side);settledDock={...dock}}
  }draw();
 }
 root.addEventListener('pointermove',pointer);root.addEventListener('pointerdown',touch);root.addEventListener('pointerleave',leave);window.addEventListener('resize',resize);
 links.forEach(a=>{a.addEventListener('pointerenter',enter);a.addEventListener('focus',focus);a.addEventListener('click',click)});resize();
 return{destroy(){destroyed=true;cancelAnimationFrame(frame);root.removeEventListener('pointermove',pointer);root.removeEventListener('pointerdown',touch);root.removeEventListener('pointerleave',leave);window.removeEventListener('resize',resize)}};
}
