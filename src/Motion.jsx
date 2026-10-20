import React, { useEffect, useRef, useState } from 'react';

export function Atmosphere(){
 return <div className="atmosphere" aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{'--left':`${(i*37+11)%100}%`,'--delay':`${-i*1.3}s`,'--duration':`${15+i%5*3}s`,'--drift':`${i%2?40:-40}px`}}>{i%4===0?'✧':'·'}</span>)}</div>
}
export function Rings(){return <div className="rings" aria-hidden="true"><svg viewBox="0 0 150 75" fill="none"><circle cx="60" cy="39" r="25"/><circle cx="91" cy="39" r="25"/><path d="M89 13l-5-7 6-5 7 5-6 7M87 6h7"/></svg><span>✧</span></div>}
export function LoveNote(){
 const [burst,setBurst]=useState(0);const [sent,setSent]=useState(false);const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 function celebrate(){setBurst(n=>n+1);setSent(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setSent(false),3000)}
 return <div className="love-note"><button onClick={celebrate} className="love-button">{sent?'A little love, a lot of happiness':'Send a little love'} <span>♡</span></button><span className="love-status" role="status">{sent?'So happy you’re part of our celebration!':''}</span>{burst>0&&<div key={burst} className="love-burst" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{'--x':`${Math.cos(i*2.4)*(65+i*6)}px`,'--y':`${-90-i%6*27}px`,'--turn':`${i*23-130}deg`,'--delay':`${i%4*.07}s`}}>{i%3===0?'✧':'♡'}</i>)}</div>}</div>
}
export function Ribbon(){return <div className="ribbon" aria-label="Love, laughter and happily ever after"><div aria-hidden="true">{Array.from({length:4},(_,i)=><span key={i}>LOVE <b>✧</b> LAUGHTER <b>✧</b> HAPPILY EVER AFTER <b>✧</b></span>)}</div></div>}
export function useInvitationMotion(){
 useEffect(()=>{
  const page=document.querySelector('.invitation');const hero=document.querySelector('.cinematic');const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  function update(){frame=0;if(!reduced.matches){const y=Math.min(500,Math.max(0,-hero.getBoundingClientRect().top));page.style.setProperty('--travel',`${y*.12}px`)}}
  function scroll(){if(!frame)frame=requestAnimationFrame(update)}
  const cards=[...document.querySelectorAll('.venue-art,.events article')];
  function tilt(event){if(reduced.matches||event.pointerType!=='mouse')return;const card=event.currentTarget;const r=card.getBoundingClientRect();card.style.setProperty('--rx',`${-(event.clientY-r.top-r.height/2)/r.height*7}deg`);card.style.setProperty('--ry',`${(event.clientX-r.left-r.width/2)/r.width*7}deg`)}
  function reset(event){event.currentTarget.style.setProperty('--rx','0deg');event.currentTarget.style.setProperty('--ry','0deg')}
  cards.forEach(card=>{card.addEventListener('pointermove',tilt);card.addEventListener('pointerleave',reset)});window.addEventListener('scroll',scroll,{passive:true});update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);cards.forEach(card=>{card.removeEventListener('pointermove',tilt);card.removeEventListener('pointerleave',reset)})}
 },[])
}
