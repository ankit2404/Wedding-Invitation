import React, { useEffect, useRef, useState } from 'react';
import { Rings } from './Motion';
const clamp=n=>Math.max(0,Math.min(1,n));

export function useScrollExperience(){
 useEffect(()=>{
  const root=document.querySelector('.invitation'),hero=document.querySelector('.heritage-hero'),intro=document.querySelector('.editorial-intro'),venue=document.querySelector('.venue-section');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  function update(){
   frame=0;const vh=innerHeight;const height=document.documentElement.scrollHeight-vh;const progress=height>0?clamp(scrollY/height):0;
   const h=hero?.getBoundingClientRect(),i=intro?.getBoundingClientRect(),v=venue?.getBoundingClientRect();
   root.style.setProperty('--page-progress',progress);root.classList.toggle('scroll-active',!reduced.matches);
   if(reduced.matches)return;
   hero?.style.setProperty('--exit',clamp(-h.top/(vh*.85)));
   intro?.style.setProperty('--read',clamp((vh*.9-i.top)/(i.height+vh*.15)));
   venue?.style.setProperty('--venue-travel',`${(clamp((vh-v.top)/(vh+v.height))-.5)*55}px`);
  }
  function queue(){if(!frame)frame=requestAnimationFrame(update)}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',queue);
  const size=new ResizeObserver(queue);size.observe(document.body);update();
  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',queue);removeEventListener('resize',queue);reduced.removeEventListener('change',queue);size.disconnect();root.classList.remove('scroll-active')};
 },[])
}
export function EditorialInvitation(){
 const phrase=['A celebration','of family.','A lifetime','of love.'];
 return <section className="editorial-intro" id="celebration"><div className="editorial-aside"><span className="eyebrow">THE INVITATION</span><span className="editorial-symbol" aria-hidden="true">❋</span><span className="editorial-footnote">KIRTI & SHIVAM<br/>DECEMBER 2026</span></div><div className="editorial-main"><h2>{phrase.map((line,i)=><span className="editorial-line" key={line} style={{'--line':i}}><span>{line}</span></span>)}</h2><div className="editorial-bottom"><p>With the blessings of our families, we invite you to be part of our engagement and wedding. Come for the rituals, stay for the laughter, and make these moments ours to keep.</p><div className="editorial-rings visible"><Rings/></div></div></div></section>
}
const chapters=[
 {number:'01',label:'THE PROMISE',title:'A beautiful beginning.',copy:'6 December · Engagement · 2:00 PM',href:'#engagement',image:'/images/sunlit-heritage.webp',position:'50% 65%'},
 {number:'02',label:'THE RITUALS',title:'A little colour. A lot of joy.',copy:'Haldi · Mehendi · Chaak Bhat',href:'#haldi',image:'/images/sunlit-heritage-mobile.webp',position:'50% 16%'},
 {number:'03',label:'THE FOREVER',title:'And then, a lifetime.',copy:'12 December · Wedding · 8:00 PM',href:'#wedding',image:'/images/sunlit-heritage.webp',position:'50% 90%'}
];
export function CelebrationScenes(){
 const ref=useRef(null);const [active,setActive]=useState(0);
 useEffect(()=>{const el=ref.current;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  function update(){frame=0;const r=el.getBoundingClientRect();const p=reduced.matches?0:clamp(-r.top/Math.max(1,r.height-innerHeight));el.style.setProperty('--scene',p);setActive(Math.min(2,Math.floor(p*2+.5)))}
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',queue);update();return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',queue);removeEventListener('resize',queue);reduced.removeEventListener('change',queue)};
 },[]);
 return <section ref={ref} className="celebration-scenes" id="moments" aria-label="A glimpse of the celebrations"><div className="scenes-pin"><div className="scenes-heading"><span className="eyebrow">A WEDDING IS MORE THAN A DAY.</span><h2>It’s a feeling.</h2><span className="scenes-counter" aria-hidden="true">0{active+1}<i>/ 03</i></span></div><div className="scenes-canvas">{chapters.map((chapter,i)=><div key={chapter.number} className={`scene-photo scene-photo-${i}`} style={{'--index':i}} aria-hidden="true"><picture><source media="(max-width: 600px)" srcSet="/images/sunlit-heritage-mobile.webp"/><img src={chapter.image} style={{objectPosition:chapter.position}} alt="" loading="lazy"/></picture></div>)}<div className="scene-photo-shade"/><div className="scenes-caption" aria-live="off"><span>{chapters[active].label}</span><h3>{chapters[active].title}</h3><p>{chapters[active].copy}</p><a href={chapters[active].href}>See the details <span>↗</span></a></div><span className="scenes-scroll" aria-hidden="true">KEEP SCROLLING <i>↓</i></span></div><div className="scenes-track" aria-hidden="true"><i/></div></div></section>
}

