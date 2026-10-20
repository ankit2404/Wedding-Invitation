import React, { useEffect, useRef, useState } from 'react';

function useScene(ref,onProgress){
 useEffect(()=>{const el=ref.current;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  function update(){frame=0;const r=el.getBoundingClientRect();const p=reduced.matches?0:Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));el.style.setProperty('--p',p);onProgress?.(reduced.matches?-1:p);}
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue);reduced.addEventListener('change',queue);update();return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',queue);window.removeEventListener('resize',queue);reduced.removeEventListener('change',queue)};
 },[onProgress])
}
export function CinematicHero({w}){
 const ref=useRef(null);useScene(ref);
 return <section ref={ref} className="cinematic" id="home" aria-label="Kirti and Shivam wedding invitation"><div className="scene-pin"><img className="royal-art" src="/images/royal-wedding-wine.webp" alt="A richly illustrated Indian palace courtyard with jasmine, marigolds, brass lamps and peacocks" fetchPriority="high"/><div className="hero-shade"/><div className="hero-stars" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{left:`${(i*31+3)%100}%`,top:`${(i*17+10)%90}%`,'--delay':`${-i*.7}s`}}/>)}</div><div className="scene-title"><span className="eyebrow">TOGETHER WITH OUR FAMILIES</span><p className="hero-script">The wedding celebration of</p><h1>{w.bride}<span>&</span>{w.groom}</h1><div className="hero-date"><span>12</span><i>DECEMBER<br/>2026</i></div><p className="hero-location">LAXMI NAGAR, DELHI <span>✧</span> 8:00 PM</p><a href="#events" className="hero-invite">Join our celebration <span>↓</span></a></div><div className="scene-caption"><p className="script">A promise. A celebration. A forever.</p><span>KIRTI & SHIVAM · DECEMBER 2026</span></div><div className="scene-scroll"><span>SCROLL INTO OUR STORY</span><i/></div><div className="scene-progress"/></div></section>
}
function EventArt({kind}){
 if(kind==='engagement')return <svg viewBox="0 0 180 110" fill="none"><circle cx="69" cy="62" r="30"/><circle cx="111" cy="62" r="30"/><path d="M100 31l-8-10 10-9 10 9-10 10M96 20h12M43 14v12m-6-6h12M141 30v10m-5-5h10"/></svg>;
 if(kind==='wedding')return <svg viewBox="0 0 180 110" fill="none"><path d="M25 100V30h130v70M15 30h150M35 30Q90 60 145 30M55 100V65h70v35M90 2v20M55 22Q90-14 125 22Z"/>{[30,150].map(x=><path key={x} d={`M${x} 30v70m-7-40h14m-14 20h14`}/>)}<path d="M77 103q-12-14 2-22-1-10 11-18-1 17 12 22 10 14-3 18" fill="currentColor" opacity=".3"/></svg>;
 return <svg viewBox="0 0 180 110" fill="none"><path d="M35 35h110q0 46-55 46T35 35ZM90 81v23m-25 0h50M30 25h120M50 17q-10-10 0-16M90 17Q80 7 90 1M130 17q-10-10 0-16"/><circle cx="35" cy="95" r="4"/><circle cx="145" cy="95" r="4"/></svg>
}
export function EventJourney({events,onCalendar}){
 const ref=useRef(null);const [active,setActive]=useState(0);
 const report=React.useCallback(p=>setActive(p<0?-1:Math.min(events.length-1,Math.floor(p*(events.length-1)+.6))),[events.length]);useScene(ref,report);
 return <section ref={ref} className="event-journey" id="events" style={{'--cards':events.length}} aria-label="Engagement and wedding celebrations"><div className="journey-pin"><div className="journey-heading"><span className="eyebrow">THE CELEBRATIONS</span><h2>A December<br/> to <em>remember.</em></h2><p>Scroll to discover each celebration</p></div><div className="journey-stage"><div className="journey-stack">{events.map((event,i)=><article key={event.kind} className={`journey-card ${i===active?'active':''}`} style={{'--index':i}}><div className="card-frame"/><span className="journey-number">0{i+1} <i>/</i> 0{events.length}</span><div className="journey-art" aria-hidden="true"><EventArt kind={event.kind}/></div><span className="event-day">{event.day}</span><h3>{event.name}</h3><div className="event-date">{event.dateLabel} <span>✧</span> {event.time}</div><p>{event.description}</p><div className="event-venue">{event.venue}</div>{event.date&&<button tabIndex={i===active||active===-1?0:-1} className="text-button" onClick={()=>onCalendar(event)}>Add to calendar ↗</button>}</article>)}</div><div className="journey-pages" aria-hidden="true">{events.map((e,i)=><span key={i} className={active===i?'selected':''}>0{i+1}<b>{e.kind==='engagement'?'06 DEC':'12 DEC'}</b></span>)}</div></div></div></section>
}


