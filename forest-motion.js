// Positions are percentages of the full illustration; y is the fox's grounded paw line.
export const TREES = [
 {en:'Intro',zh:'简介',path:'/intro',x:15.7,labelY:17,root:88.5,half:3.4,side:1},
 {en:'Background',zh:'背景',path:'/background',x:35,labelY:39,root:75.1,half:3.4,side:-1},
 {en:'Publications',zh:'论文发表',path:'/publications',x:51.1,labelY:30,root:86.8,half:3.6,side:1},
 {en:'Design Awards',zh:'设计获奖',path:'/awards',x:70.5,labelY:41,root:89.2,half:3.7,side:-1},
 {en:'Portfolio',zh:'作品集',path:'/portfolio',x:86.8,labelY:42,root:83.5,half:3.5,side:-1}
];
export const IDLE_POSES=['stand','sit','sniff'];
export const MOBILE_TREES=TREES.map((tree,i)=>({...tree,...[
 {x:12.6,root:79.5,half:4.5,labelY:34},
 {x:30.8,root:71.5,half:5,labelY:46},
 {x:52.6,root:86,half:6,labelY:58},
 {x:70.5,root:76.4,half:4.8,labelY:37},
 {x:88.5,root:82,half:5,labelY:50}
][i]}));
// The generated night sheets retain the composition but have slightly higher
// ground contours. Match the paw line to each sheet rather than assuming it.
export const NIGHT_TREES=TREES.map((tree,i)=>({...tree,x:[15.7,35,50.5,70,85][i],root:[85.6,72.9,84.2,87.4,80.8][i]}));
export const MOBILE_NIGHT_TREES=MOBILE_TREES.map((tree,i)=>({...tree,root:[77.2,69.2,83.6,74.5,79.9][i]}));
export const raisedPaw=pose=>pose==='stand';
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function dockFor(index,pose,actorWidth,bounds=[6,94],options={}) {
 const tree=(options.trees||TREES)[index];let side=options.side||tree.side;
 const behind=raisedPaw(pose);
 // This drawing looks back over its shoulder: its chest and raised paw point
 // opposite its nose. Put the chest against the trunk, with the head outside.
 const clearance=behind?actorWidth*.25+.55:actorWidth*.05+.6;
 let intended=tree.x+side*(tree.half+clearance);
 if(intended<bounds[0]||intended>bounds[1]){const alternate=tree.x-side*(tree.half+clearance);if(alternate>=bounds[0]&&alternate<=bounds[1]){side=-side;intended=alternate}}
 const x=clamp(intended,bounds[0],bounds[1]);
 const front=!behind||Math.abs(x-intended)>.15;
 const actualSide=x<tree.x?-1:1;
 return {x,y:tree.root+(front?2.7:-2.2),index,pose,side:actualSide,front,direction:behind?actualSide:-actualSide};
}
function add(points,p){const prev=points.at(-1);if(!prev||Math.hypot(prev.x-p.x,prev.y-p.y)>.15)points.push(p)}
export function planRoute(start,dock,bounds=[6,94],trees=TREES,options={}) {
 const points=[{x:start.x,y:start.y}];
 const departure=options.departure;
 // A small departure flourish belongs only to an end tree, never the target.
 // From its inner side, pass around the far outer side and emerge toward the
 // middle. An outer-side departure already passes naturally around that trunk.
 if(departure&&departure.index!==dock.index&&(departure.index===0||departure.index===trees.length-1)){
  const tree=trees[departure.index],inward=departure.index===0?1:-1;
  if(departure.side===inward&&(trees[dock.index].x-tree.x)*inward>0){
   const outer=clamp(tree.x-inward*(tree.half+4.5),...bounds),inner=clamp(tree.x+inward*(tree.half+4.5),...bounds);
   // Portrait end trees can be too close to the screen edge for a whole fox
   // to fit outside them. In that case leave naturally rather than clip it.
   if((outer-tree.x)*inward<0){
    add(points,{x:inner,y:tree.root-5.1});
    add(points,{x:outer,y:tree.root-5.1});
    add(points,{x:outer,y:tree.root+3.6});
    add(points,{x:tree.x,y:tree.root+4});
    add(points,{x:inner,y:tree.root+3.6});
   }
  }
 }
 const onward=points.at(-1),span=Math.abs(dock.x-onward.x);
 // One broad sweep for the whole crossing, instead of rising and dipping at
 // every trunk. Different root depths still put the fox in front of some
 // trees and behind others without turning the ground into a slalom.
 if(span>20)add(points,{
  x:(onward.x+dock.x)/2,
  y:(onward.y+dock.y)/2-Math.min(6.5,span*.105)
 });
 // Stop on the arrival side. Do not cross or orbit the destination trunk.
 const final={x:dock.x,y:dock.y},previous=points.at(-1);
 if(Math.hypot(previous.x-final.x,previous.y-final.y)>1e-9)points.push(final);
 return points.map(p=>({x:clamp(p.x,bounds[0],bounds[1]),y:clamp(p.y,58,94)}));
}
export function makeTrack(points,width,height){
 const track=[{...points[0],distance:0}];let distance=0;
 // Shape-preserving vertical tangents keep a broad hill a single hill. An
 // unconstrained spline can add small extra dips near either end of a slope.
 const verticalSlope=points.map((p,i)=>{
  if(!i)return(points[1]?.y??p.y)-p.y;
  if(i===points.length-1)return p.y-points[i-1].y;
  const before=p.y-points[i-1].y,after=points[i+1].y-p.y;
  return before*after<=0?0:2*before*after/(before+after);
 });
 for(let i=0;i<points.length-1;i++){
  const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],d=points[Math.min(points.length-1,i+2)];
  for(let n=1;n<=24;n++){
   const t=n/24,t2=t*t,t3=t2*t;
   const value=k=>.5*((2*b[k])+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t2+(-a[k]+3*b[k]-3*c[k]+d[k])*t3);
   const y=(2*t3-3*t2+1)*b.y+(t3-2*t2+t)*verticalSlope[i]+(-2*t3+3*t2)*c.y+(t3-t2)*verticalSlope[i+1];
   const p={x:clamp(value('x'),Math.min(b.x,c.x),Math.max(b.x,c.x)),y};
   const prev=track.at(-1);
   // Tight gaps between neighboring roots can make a smooth spline briefly
   // reverse horizontally. Preserve the segment's intended walking direction.
   p.x=c.x>=b.x?Math.max(prev.x,p.x):Math.min(prev.x,p.x);
   distance+=Math.hypot((p.x-prev.x)*width/100,(p.y-prev.y)*height/100);track.push({...p,distance});
  }
 }
 return track;
}
export function pointOnTrack(track,distance){let lo=0,hi=track.length-1;while(lo<hi){const m=(lo+hi)>>1;if(track[m].distance<distance)lo=m+1;else hi=m}if(!lo)return track[0];const b=track[lo],a=track[lo-1],f=clamp((distance-a.distance)/(b.distance-a.distance||1),0,1);return{x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f}}
export function treeInFront(tree,point){return point.y<tree.root-.5}
export function depthScale(point,trees=TREES){
 // Perspective follows the scene's vertical depth, never the identity of the
 // closest tree. Crossing a tree midpoint must not resize the entire fox.
 const ground=trees.reduce((sum,tree)=>sum+tree.root,0)/trees.length;
 return clamp(.94+(point.y-ground+4.5)*.007,.94,1.035);
}
