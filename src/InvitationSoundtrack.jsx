import React, {useEffect, useRef, useState} from 'react';

export default function InvitationSoundtrack(){
 const audio=useRef(null),manuallyPaused=useRef(false);
 const [playing,setPlaying]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{
  const player=audio.current;
  player.volume=.65;
  const start=()=>{if(!manuallyPaused.current&&player.paused)player.play().catch(()=>{})};
  const firstInteraction=event=>{
   if(event.target.closest?.('.soundtrack-control'))return;
   start();
  };
  start();
  document.addEventListener('pointerdown',firstInteraction);
  document.addEventListener('keydown',firstInteraction);
  return()=>{document.removeEventListener('pointerdown',firstInteraction);document.removeEventListener('keydown',firstInteraction);player.pause()};
 },[]);
 async function toggle(){
  const player=audio.current;
  if(!player.paused){manuallyPaused.current=true;player.pause();return}
  manuallyPaused.current=false;
  setFailed(false);
  try{await player.play()}catch{setFailed(true)}
 }
 return <>
  <audio ref={audio} src="/songs/Din%20Shagna%20Da%20X%20Kabira.mp3" loop preload="auto" onPlay={()=>{setPlaying(true);setFailed(false)}} onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setPlaying(false)}}/>
  <button className="music-pill soundtrack-control" onClick={toggle} aria-label={playing?'Pause wedding music':'Play wedding music'} aria-pressed={playing} title="Din Shagna Da X Kabira">
   <span aria-hidden="true">{playing?'Ⅱ':'♫'}</span><span>{failed?'Retry music':playing?'Pause music':'Play music'}</span>
  </button>
  {failed&&<span className="soundtrack-error" role="status">Music could not play. Tap to retry.</span>}
 </>;
}
