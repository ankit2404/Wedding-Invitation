import React,{useEffect,useRef,useState} from 'react';
import {wedding as w} from './config';
import './midnight.css';
import './daylight.css';
import './flourish.css';
import './garden-motion.css';
import InvitationSoundtrack from './InvitationSoundtrack';
function GardenSprig({side=''}){return <svg className={`garden-sprig ${side}`} viewBox="0 0 180 300" fill="none" aria-hidden="true"><path d="M90 295C40 210 130 160 75 35" stroke="currentColor" strokeWidth="1.2"/>{[0,1,2,3,4].map(i=><g key={i} transform={`translate(${i%2?87:70} ${55+i*43}) rotate(${i%2?35:-45})`}><path d="M0 0Q-42-42-45-5Q-30 16 0 0" fill="currentColor" opacity=".25"/><path d="M0 0Q35-42 43-7Q28 17 0 0" fill="currentColor" opacity=".35"/></g>)}<g className="sprig-bloom" transform="translate(75 35)">{Array.from({length:6},(_,i)=><ellipse key={i} rx="10" ry="22" cy="-15" fill="#e7a382" transform={`rotate(${i*60})`}/>) }<circle r="8" fill="#f4d173"/></g></svg>}
function calendar(){
 const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Kirti Shivam//Wedding//EN','BEGIN:VEVENT','UID:kirti-shivam-20261212@invitation',`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,'DTSTART:20261212T143000Z','DTEND:20261212T173000Z','SUMMARY:Kirti & Shivam — The wedding','LOCATION:Laxmi Nagar\\, Delhi','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/calendar'}));const a=document.createElement('a');a.href=url;a.download='Kirti-and-Shivam.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export default function MidnightInvitation(){
 const [burst,setBurst]=useState(0),[notice,setNotice]=useState(''),[now,setNow]=useState(Date.now());const hero=useRef(null);
 const [autoScroll,setAutoScroll]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{
  if(!autoScroll)return;
  let running=true,frame=0,last=0,elapsed=0,position=window.scrollY;
  const pause=()=>{running=false;cancelAnimationFrame(frame);setAutoScroll(false)};
  const onKey=e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Tab'].includes(e.key))pause()};
  const onClick=e=>{if(e.target.closest('a,button')&&!e.target.closest('.autoscroll-control'))pause()};
  const tick=time=>{
   if(!running)return;
   if(!last)last=time;
   const dt=Math.min((time-last)/1000,.05);last=time;
   if(document.hidden){last=0;frame=requestAnimationFrame(tick);return}
   elapsed+=dt;
   const end=document.documentElement.scrollHeight-window.innerHeight;
   if(position>=end-1){pause();return}
   if(elapsed>3){
    const ramp=Math.min(1,(elapsed-3)/3);
    const ease=ramp*ramp*(3-2*ramp);
    const brake=Math.min(1,Math.max(.12,(end-position)/160));
    position=Math.min(end,position+36*ease*brake*dt);
    window.scrollTo({top:position,behavior:'instant'});
   }else position=window.scrollY;
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  const onVisibility=()=>{last=0;position=window.scrollY};
  document.addEventListener('visibilitychange',onVisibility);
  window.addEventListener('wheel',pause,{passive:true});window.addEventListener('touchstart',pause,{passive:true});window.addEventListener('keydown',onKey);document.addEventListener('click',onClick);
  return()=>{running=false;cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('wheel',pause);window.removeEventListener('touchstart',pause);window.removeEventListener('keydown',onKey);document.removeEventListener('click',onClick)};
 },[autoScroll]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('type-visible');observer.unobserve(entry.target)}})},{threshold:.18});document.querySelectorAll('h2,.occasion,.floral-monogram').forEach(el=>{el.classList.add('type-reveal');observer.observe(el)});return()=>observer.disconnect()},[]);
 useEffect(()=>{document.title='Kirti & Shivam — A little magic. A lifetime of us.';const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[]);
 useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),3500);return()=>clearTimeout(t)},[notice]);
 function move(e){if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();hero.current.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)*.018}px`);hero.current.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)*.018}px`)}
 async function share(){try{if(navigator.share)await navigator.share({title:'Kirti & Shivam',text:'Come celebrate with us. 12 December 2026.',url:location.href});else{await navigator.clipboard.writeText(location.href);setNotice('Invitation link copied!')}}catch(e){if(e.name!=='AbortError')setNotice('Copy the invitation URL from your address bar.')}}
 const remaining=Math.max(0,new Date(w.date)-now),counts=[Math.floor(remaining/86400000),Math.floor(remaining/3600000)%24,Math.floor(remaining/60000)%60,Math.floor(remaining/1000)%60];
 return <div className="midnight"><button className="autoscroll-control" onClick={()=>setAutoScroll(value=>!value)} aria-pressed={autoScroll} aria-label={autoScroll?'Pause automatic scrolling':'Start automatic scrolling'}><span aria-hidden="true">{autoScroll?'Ⅱ':'▷'}</span>{autoScroll?'Pause auto-scroll':'Auto-scroll'}{autoScroll&&<i aria-hidden="true"/>}</button><div className="entrance" aria-hidden="true"><span/><span/></div>
 <header className="navigation"><a className="monogram" href="#home">k<span>&</span>s <b>✦</b></a><nav aria-label="Main navigation"><a href="#celebrations">The celebrations</a><a href="#details">The details</a><button onClick={calendar}>Save our date ↗</button></nav></header>
 <main><section className="hero" id="home" ref={hero} onPointerMove={move}><div className="hero-art" aria-hidden="true"/><div className="hero-shade"/><div className="petals" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{'--x':`${i*37%100}%`,'--delay':`${-i*1.7}s`,'--duration':`${12+i%6*2}s`}}/>)}</div>
 <div className="hero-topline"><span>AN INVITATION TO OUR FOREVER</span><span>DELHI, INDIA · 2026</span></div>
 <div className="hero-title"><p className="eyebrow">Together with our families</p><h1><span>Kirti</span><em>&</em><span>Shivam</span></h1><div className="hero-flourish" aria-hidden="true"><svg viewBox="0 0 300 35" fill="none"><path d="M5 24C58 24 73 5 117 18M295 24C242 24 227 5 183 18M133 18l17-12 17 12-17 12-17-12Z"/><path d="M24 24q15-23 30-9M276 24q-15-23-30-9"/></svg></div><div className="hero-caption">A little magic. A lifetime of <i>us.</i></div></div>
 <div className="hero-bottom"><div className="date-lockup"><span>THE WEDDING</span><strong>12 <i>/</i> 12 <i>/</i> 26</strong><p>8:00 PM · Laxmi Nagar, Delhi</p></div><a className="round-link" href="#intro"><span>COME CELEBRATE</span><b>↓</b></a><div className="hero-note">Two families.<br/>One beautiful beginning.<small>And you, right there with us.</small></div></div></section>
 <div className="ticker" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>THE START OF FOREVER <b>✦</b> KIRTI & SHIVAM <b>✦</b> YOU’RE INVITED <b>✦</b> </span>)}</div></div>
 <section className="intro section" id="intro"><div className="intro-side reveal"><span className="eyebrow">WITH FULL HEARTS & OPEN ARMS</span><div className="floral-monogram" aria-label="Kirti and Shivam monogram"><svg viewBox="0 0 280 310" fill="none" aria-hidden="true"><ellipse cx="140" cy="155" rx="88" ry="118" stroke="currentColor" strokeWidth=".8"/><ellipse cx="140" cy="155" rx="80" ry="110" stroke="currentColor" strokeWidth=".5"/><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M83 264C23 212 24 114 78 55M197 264c60-52 59-150 5-209"/><path d="M50 208q-33-8-28-35 27 3 28 35Zm-9-39q-26-22-14-43 25 12 14 43Zm3-42q-16-24 0-44 20 16 0 44Zm17-43q-8-24 14-38 12 22-14 38Zm169 124q33-8 28-35-27 3-28 35Zm9-39q26-22 14-43-25 12-14 43Zm-3-42q16-24 0-44-20 16 0 44Zm-17-43q8-24-14-38-12 22 14 38"/><path d="M55 224q25-7 30 15-22 10-30-15Zm170 0q-25-7-30 15 22 10 30-15"/></g><g fill="#d4886b"><ellipse cx="140" cy="38" rx="8" ry="17"/><ellipse cx="140" cy="38" rx="8" ry="17" transform="rotate(60 140 38)"/><ellipse cx="140" cy="38" rx="8" ry="17" transform="rotate(120 140 38)"/></g><circle cx="140" cy="38" r="5" fill="#f7d486"/></svg><span className="floral-initials">K<i>&</i>S</span><span className="floral-caption">TOGETHER, ALWAYS</span></div><span className="tiny">06 & 12 DECEMBER 2026</span></div><div className="reveal"><h2>Some things<br/>are just <em>meant</em><br/>to <span className="pink-word">be.</span><sup>♡</sup></h2><p>With the blessings of our families, we’re beginning our forever. And we couldn’t imagine celebrating it without you.</p><p className="intro-sign">Come for the love. Stay for the dancing.</p></div></section>
 <section className="celebrations section" id="celebrations"><GardenSprig/><GardenSprig side="sprig-right"/>
 <div className="section-heading reveal"><div><span className="eyebrow">THREE MOMENTS. ONE BEAUTIFUL BEGINNING.</span><h2>The days<br/><em>we’ll remember.</em></h2><div className="heading-vine" aria-hidden="true">❧</div></div><p>From the first promise<br/>to the last dance.</p></div>
 <div className="celebration-tickets">{w.events.map((event,i)=>{
 const mapUrl=event.mapsUrl||(event.kind==='wedding'?w.mapsUrl:'');
 return <article className={'occasion occasion-'+event.kind+' reveal'} key={event.kind}>
 <div className="occasion-paper"><div className="occasion-top"><span>THE CELEBRATION / 0{i+1}</span><span>✦</span></div>
 <div className="occasion-illustration" aria-hidden="true"><svg viewBox="0 0 240 150" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{event.kind==='engagement'?<><circle cx="98" cy="87" r="35"/><circle cx="142" cy="87" r="35"/><path d="m137 47-10-13 14-11 15 11-10 13m-19-13h29m-15-11-5 11 5 13 5-13-5-11M64 28v16m-8-8h16m102 20v12m-6-6h12"/><path d="M50 127q70 18 140 0"/></>:event.kind==='wedding'?<><path d="M42 126h156M53 120V56h134v64M62 120V63h116v57M42 56q78-85 156 0H42ZM79 32q41-39 82 0M120 13V3m-6 6h12M75 64v17m30-17v10m30-10v10m30-10v17"/><path d="M89 125v-20q31-47 62 0v20M46 135h148"/><circle cx="75" cy="85" r="3"/><circle cx="165" cy="85" r="3"/><path d="M24 105q-11-10 0-24 11 14 0 24Zm0 0v20m192-20q-11-10 0-24 11 14 0 24Zm0 0v20"/></>:<><path d="M63 48h39v20q0 24-20 24T63 68V48Zm75 0h39v20q0 24-20 24t-19-24V48ZM82 92v31m-15 0h30m61-31v31m-15 0h30M64 65h37m38 0h37M115 34l5-15 5 15m-5-15V7M48 25l8 8m128-8-8 8"/><path d="M107 127h26m-13-10v10M113 105q7-19 14 0c0 12-14 12-14 0Z"/></>}</svg></div>
 <span className="occasion-script">{event.kind==='engagement'?'a promise to keep':event.kind==='wedding'?'our forever starts here':'a toast to us'}</span>
 <h3>{event.name}</h3><p className="occasion-description">{event.description}</p>
 <div className="occasion-date"><strong>{event.kind==='engagement'?'06':'12'}</strong><div><span>DECEMBER 2026</span><span>{event.day} · {event.time}</span></div></div>
 <div className="occasion-location"><span className="location-label">THE PLACE</span><span>{event.venue}</span>{mapUrl?<a href={mapUrl} target="_blank" rel="noreferrer">View location ↗</a>:<small>Location details to follow</small>}</div>
 <span className="occasion-seal" aria-hidden="true">k & s</span></div>
 </article>})}</div></section>
 <section className="forever"><div className="garden-halo" aria-hidden="true"/><GardenSprig/><GardenSprig side="sprig-right"/><div className="forever-rings" aria-hidden="true"><i/><i/></div><div className="reveal"><span className="eyebrow">EVERY SECOND, A LITTLE CLOSER</span><h2>Can’t wait<br/>for <em>forever.</em></h2><div className="countdown" aria-label="Countdown to the wedding">{counts.map((n,i)=><div key={i}><strong>{String(n).padStart(2,'0')}</strong><span>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</span></div>)}</div><button className="pill-button" onClick={calendar}>Make a little room in your calendar ↗</button></div></section>
 <section className="details section" id="details"><div className="location-art reveal"><div className="location-grid" aria-hidden="true"/><span className="location-star" aria-hidden="true">✧</span><span className="location-pin">♡</span><strong>Meet us<br/>in <em>Delhi.</em></strong><span className="location-stamp">12 DECEMBER<br/>SAVE THE DATE</span><small>A CITY. A CELEBRATION. OUR PEOPLE.</small></div><div className="details-copy reveal"><span className="eyebrow">YOUR PLACE IS WITH US</span><h2>Good company.<br/><em>Great memories.</em></h2><p>Bring your blessings, your biggest smiles, and your best dance moves.</p><div className="address"><span>THE WEDDING · SATURDAY, 12 DECEMBER</span><h3>Laxmi Nagar, Delhi</h3><p>8:00 PM onwards<br/>The exact venue will be shared soon.</p></div>{w.mapsUrl&&<a className="pill-button" href={w.mapsUrl} target="_blank" rel="noreferrer">View wedding location ↗</a>}<small>Engagement · Sunday, 6 December · 2:00 PM<br/>Venue details coming soon.</small></div></section>
 <section className="finale"><GardenSprig/><GardenSprig side="sprig-right"/><span className="eyebrow reveal">THE BEST PART OF OUR DAY? YOU.</span><h2 className="reveal">Let’s make<br/>some <em>memories.</em><span>✷</span></h2><p>Two hearts. All our favourite people.<br/>A celebration we’ll never forget.</p><div className="finale-actions"><button className="pill-button" onClick={()=>{setBurst(b=>b+1);setNotice('A little love. A lot of happiness. ♡')}}>Shower some love ♡</button><button className="share-button" onClick={share}>Share the invitation ↗</button></div>{burst>0&&<div className="confetti" key={burst} aria-hidden="true">{Array.from({length:42},(_,i)=><i key={i} style={{'--dx':`${Math.cos(i*2.4)*(140+i*7)}px`,'--dy':`${-160-i%9*60}px`,'--rotate':`${i*47}deg`,'--color':['#ff82b5','#f2cf7b','#d4edaf'][i%3]}}>{i%3?'✦':'♥'}</i>)}</div>}<footer><a href="#home">Kirti & Shivam</a><span>WITH LOVE, ALWAYS.</span><span>06 & 12 DECEMBER 2026</span></footer></section></main>
 <InvitationSoundtrack/>{notice&&<div className="notice" role="status">{notice}</div>}</div>
}
