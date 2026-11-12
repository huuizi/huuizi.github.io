const SETTLE_DELAY=90,POINTER_DISTANCE=4;

export function mountContactScene(root){
 if(!root)return{destroy(){}};
 let destroyed=false,running=false,timer=null,anchor=null,lastPointer=null,activeBurst=false;
 let settled='person',nextStop='computer';
 const inViewport=()=>{const r=root.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<window.innerHeight&&r.right>0&&r.left<window.innerWidth};
 let visible=inViewport(),observer=null;
 const clearTimer=()=>{if(timer!==null){window.clearTimeout(timer);timer=null}};
 const setState=value=>{if(!destroyed&&root.dataset.foxState!==value)root.dataset.foxState=value};
 const canRun=()=>!destroyed&&visible&&document.visibilityState!=='hidden';
 function later(callback,delay){
  clearTimer();if(!canRun())return;
  timer=window.setTimeout(()=>{timer=null;if(canRun())callback()},delay);
 }
 function settle(){
  later(()=>{
   if(!activeBurst)return;
   activeBurst=false;settled=nextStop;nextStop=nextStop==='computer'?'person':'computer';setState(settled);
  },SETTLE_DELAY);
 }
 function sync(){
  const next=canRun();if(next===running)return;running=next;clearTimer();anchor=null;lastPointer=null;activeBurst=false;
  // Visibility changes do not count as completed activity or advance a pose.
  if(running)setState(settled);
 }
 function refreshVisibility(){visible=inViewport();sync()}
 function activity(){
  if(!observer)refreshVisibility();
  if(!canRun())return;
  activeBurst=true;setState('viewer');settle();
 }
 // Scroll can move the illustration into view before the asynchronous
 // intersection callback arrives. Preserve that very first active gesture.
 function scrollActivity(){refreshVisibility();activity()}
 function pointer(event){
  if(event.pointerType==='touch'||!canRun()){anchor=null;lastPointer=null;return}
  const point={x:event.clientX,y:event.clientY};
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y))return;
  const moved=lastPointer?point.x!==lastPointer.x||point.y!==lastPointer.y:Math.hypot(event.movementX||0,event.movementY||0)>0;
  lastPointer=point;
  if(!anchor){anchor=point;if(Math.hypot(event.movementX||0,event.movementY||0)>=POINTER_DISTANCE)activity();return}
  // Filter jitter before a gesture, but keep even slow continuous movement
  // within the same burst rather than consuming another alternating stop.
  if(activeBurst&&moved){anchor=point;activity();return}
  if(Math.hypot(point.x-anchor.x,point.y-anchor.y)<POINTER_DISTANCE)return;
  anchor=point;activity();
 }
 function visibility(){refreshVisibility()}
 // No autonomous cycling or motion is scheduled. These direct state changes
 // also preserve the interaction when reduced motion is requested.
 if('IntersectionObserver' in window){
  observer=new window.IntersectionObserver(entries=>{
   if(destroyed)return;
   const entry=entries.find(item=>item.target===root);if(!entry)return;
   visible=entry.isIntersecting&&entry.intersectionRatio>0;sync();
  },{threshold:[0,.01]});
  observer.observe(root);
 }
 document.addEventListener('pointermove',pointer,{passive:true});
 document.addEventListener('touchmove',scrollActivity,{passive:true});
 window.addEventListener('scroll',scrollActivity,{passive:true});
 window.addEventListener('resize',refreshVisibility,{passive:true});
 document.addEventListener('visibilitychange',visibility);
 sync();
 return{destroy(){
  if(destroyed)return;destroyed=true;running=false;activeBurst=false;clearTimer();anchor=null;lastPointer=null;observer?.disconnect();
  document.removeEventListener('pointermove',pointer);
  document.removeEventListener('touchmove',scrollActivity);
  window.removeEventListener('scroll',scrollActivity);
  window.removeEventListener('resize',refreshVisibility);
  document.removeEventListener('visibilitychange',visibility);
 }};
}
