import React from 'react';

function CeremonyIcon({kind}){
 const drawings={
  engagement:<><circle cx="21" cy="31" r="12"/><circle cx="38" cy="31" r="12"/><path d="m35 19-5-7 7-6 7 6-7 7M33 11h8"/></>,
  haldi:<><path d="M8 29h44Q49 47 30 47T8 29ZM6 25h48M18 47h24M25 19q-5-6 1-12M35 19q-5-6 1-12"/><path d="m47 8 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></>,
  mehendi:<><path d="M18 50q-6-9-6-18V19q0-5 5-4v16-21q4-5 7 0v20-24q5-4 7 1v23-20q5-4 7 1v25l4-10q5-5 8 0l-7 21-9 8H21Z"/><circle cx="27" cy="38" r="6"/><path d="m27 29 1 3m7 5 3 1m-11 8-1 3m-8-11-3 1M23 34l8 8m-8 0 8-8"/></>,
  chaakbhat:<><path d="M8 45h44M13 40h34M18 36V20h24v16M14 20h32M21 17q9-19 18 0M30 6V2M8 44v7m44-7v7"/><path d="M24 25h12m-12 6h12"/></>,
  wedding:<><path d="M8 51V18h44v33M3 18h54M13 18q17 15 34 0M18 51V34h24v17M15 13Q30-7 45 13ZM30 7V1"/><path d="M24 54q-5-8 2-11-1-6 4-10 0 8 6 11 5 8-2 10" fill="currentColor" opacity=".2"/></>,
  dinner:<><path d="M9 27h42Q49 43 30 43T9 27ZM30 43v10m-9 0h18M6 22h48M17 15q-5-5 0-11M30 15q-5-5 0-11M43 15q-5-5 0-11"/></>
 };
 return <svg viewBox="0 0 60 60" fill="none" aria-hidden="true">{drawings[kind]||drawings.wedding}</svg>
}
function dateParts(event){
 if(!event.date&&!/^\d/.test(event.dateLabel||''))return {number:'—',month:'DATE TBA'};
 const match=(event.dateLabel||'').match(/^(\d+)\s+(\w+)/);
 return match?{number:match[1].padStart(2,'0'),month:match[2].slice(0,3).toUpperCase()+' 2026'}:{number:'—',month:'DATE TBA'};
}
export default function CeremonySchedule({events,onCalendar}){
 return <section className="schedule-section section" id="events" aria-label="All wedding ceremonies"><div className="schedule-heading reveal"><span className="eyebrow">CELEBRATE WITH US</span><h2>Every ritual.<br/><em>Every little joy.</em></h2><p>Celebrate with us, from the first promise to our wedding day.</p></div><div className="schedule-list">{events.map(event=>{const date=dateParts(event);return <article key={event.kind} id={event.kind} className={`schedule-row schedule-row-${event.kind} reveal`} aria-labelledby={`${event.kind}-title`}><div className="schedule-date" aria-hidden="true"><strong>{date.number}</strong><span>{date.month}</span></div><details className="schedule-event"><summary><span className="schedule-icon"><CeremonyIcon kind={event.kind}/></span><span className="schedule-title"><strong id={`${event.kind}-title`}>{event.name}</strong><span>{event.venue}</span></span><span className="schedule-when"><strong>{event.dateLabel||'Date to be announced'}</strong><span>{event.time}</span></span><span className="schedule-expand" aria-hidden="true"/></summary><div className="schedule-more"><p>{event.description}</p>{event.date?<button className="schedule-calendar" onClick={()=>onCalendar(event)}>Add {event.kind==='engagement'?'engagement':event.kind==='wedding'?'wedding':event.name.toLowerCase()} to calendar <span>↗</span></button>:<span className="schedule-pending">We’ll share the remaining details here soon.</span>}</div></details></article>})}</div><p className="schedule-footnote">More details will be added as our celebrations come together.</p></section>
}
