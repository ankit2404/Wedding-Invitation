import React, { useEffect, useState } from 'react';
import { wedding as w } from './config';
import HeritageHero from './HeritageHero';
import CeremonySchedule from './CeremonySchedule';
import WeddingMusic from './WeddingMusic';
import { LoveNote, Ribbon } from './Motion';
import { useScrollExperience, EditorialInvitation, CelebrationScenes } from './ScrollExperience';
import './wedding.css';
import './celebrations.css';
import './heritage.css';
import './schedule.css';
import './experience.css';

export default function App(){
 useScrollExperience();
 const [now,setNow]=useState(Date.now()),[toast,setToast]=useState('');
 const title=`${w.bride} & ${w.groom}`;
 useEffect(()=>{document.title=`${title} • A December Wedding`;const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[title]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(timer)},[toast]);
 const left=Math.max(0,new Date(w.date).getTime()-now);
 const counts=[Math.floor(left/86400000),Math.floor(left/3600000)%24,Math.floor(left/60000)%60,Math.floor(left/1000)%60];
 async function share(){try{if(navigator.share)await navigator.share({title,text:`Celebrate ${title}: engagement on 6 December and wedding on 12 December 2026.`,url:location.href});else{await navigator.clipboard.writeText(location.href);setToast('Invitation link copied')}}catch(e){if(e.name!=='AbortError')setToast('Copy the invitation link from your address bar')}}
 function calendar(event=w.events.find(event=>event.kind==='wedding')){
  if(!event?.date)return;
  const esc=s=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const stamp=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const start=new Date(event.date),end=new Date(start.getTime()+3*3600000);
  const data=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Kirti and Shivam//Wedding//EN','BEGIN:VEVENT',`UID:${event.kind}-2026@kirti-shivam.invitation`,`DTSTAMP:${stamp(new Date())}`,`DTSTART:${stamp(start)}`,`DTEND:${stamp(end)}`,`SUMMARY:${esc(`${title} — ${event.name}`)}`,`LOCATION:${esc(event.venue)}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const url=URL.createObjectURL(new Blob([data],{type:'text/calendar'}));const a=document.createElement('a');a.href=url;a.download=`${event.kind}.ics`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <div className="invitation"><div className="grain"/>
 <main><HeritageHero w={w}/>
 <EditorialInvitation/>
 <div className="date-strip"><a href="#engagement"><span>THE ENGAGEMENT</span><strong>06 <i>DEC</i></strong><small>Sunday · 2:00 PM</small></a><span className="strip-star" aria-hidden="true">✧</span><a href="#wedding"><span>THE WEDDING</span><strong>12 <i>DEC</i></strong><small>Saturday · 8:00 PM</small></a></div>
 <CelebrationScenes/>
 <CeremonySchedule events={w.events} onCalendar={calendar}/>
 <section className="count-section section reveal"><span className="eyebrow">{left?'THE EXCITEMENT IS COUNTING UP':'OUR BEAUTIFUL BEGINNING'}</span><h2>{left?'Until we say':'A day to'} <em>{left?'forever.':'remember.'}</em></h2><div className="countdown">{counts.map((n,i)=><div key={i}><strong key={n}>{String(n).padStart(2,'0')}</strong><span>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</span></div>)}</div><button className="text-button" onClick={()=>calendar()}>Add the wedding to your calendar <span>↗</span></button></section>
 <section className="venue-section section" id="details"><div className="venue-visual reveal"><div className="venue-photo" role="img" aria-label="Illustrated Indian palace wedding courtyard"/><span className="venue-photo-note">A celebration to remember</span></div><div className="venue-copy reveal"><span className="eyebrow">A PLACE IN OUR CELEBRATION</span><h2>Meet us where<br/>the magic <em>begins.</em></h2><div className="venue-address"><span>WEDDING · 12 DECEMBER · 8:00 PM</span><h3>{w.venue||w.address}</h3><p>{w.venue?w.address:'Exact wedding venue details will be shared soon.'}</p></div><a className="primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([w.venue,w.address].filter(Boolean).join(', '))}`} target="_blank" rel="noreferrer">{w.venue?'Get directions':'Explore the area'} <span>↗</span></a><p className="engagement-venue">Engagement · 6 December · 2:00 PM<br/>Venue to be announced</p></div></section>
 <section className="rsvp section reveal" id="rsvp"><div className="rsvp-arch" aria-hidden="true"/><span className="eyebrow">THE BEST PART OF OUR DAY? YOU.</span><h2>Bring your blessings.<br/>And your <em>dancing shoes.</em></h2><p>Our celebration would be incomplete without you.<br/>We can’t wait to make these memories together.</p>{w.rsvpPhone?<a className="primary light" href={`https://wa.me/${w.rsvpPhone}?text=${encodeURIComponent(`I'd love to celebrate ${title}! My name is: `)}`} target="_blank" rel="noreferrer">RSVP on WhatsApp <span>↗</span></a>:<button className="primary light" onClick={()=>calendar()}>Save the wedding date <span>♡</span></button>}<LoveNote/><button className="text-button" onClick={share}>Share the invitation ↗</button></section></main>
 <Ribbon/><footer><a className="footer-monogram" href="#home">K<span>&</span>S</a><p className="script">With love, {title}</p><span>06 & 12 DECEMBER 2026 <b>✧</b> DELHI</span><small>Two hearts. Two families. A lifetime of memories.</small></footer><WeddingMusic url={w.musicUrl} youtubeId={w.musicYouTubeId} title={w.musicTitle}/>{toast&&<div className="toast" role="status">{toast}</div>}</div>
}

