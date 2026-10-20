import React, { useEffect, useRef, useState } from 'react';
import YouTubeMusic from './YouTubeMusic';

// Original pentatonic instrumental, synthesized locally. No third-party recording.
async function makeSoundtrack(context){
 const rate=22050,duration=32;const offline=new OfflineAudioContext(2,rate*duration,rate);
 const master=offline.createGain();master.gain.value=.28;master.connect(offline.destination);
 const echo=offline.createDelay(1);echo.delayTime.value=.375;const feedback=offline.createGain();feedback.gain.value=.28;echo.connect(feedback);feedback.connect(echo);echo.connect(master);
 const frequency=midi=>440*Math.pow(2,(midi-69)/12);
 function note(midi,time,length,volume,type='sine',pan=0){
  const oscillator=offline.createOscillator(),gain=offline.createGain(),stereo=offline.createStereoPanner();oscillator.type=type;oscillator.frequency.value=frequency(midi);stereo.pan.value=pan;
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.025);gain.gain.exponentialRampToValueAtTime(.0001,time+length);
  oscillator.connect(gain);gain.connect(stereo);stereo.connect(master);stereo.connect(echo);oscillator.start(time);oscillator.stop(time+length+.01);
 }
 const chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,62]];
 const melody=[72,null,76,79,76,null,74,72,69,null,72,76,72,69,67,null,65,null,69,72,74,null,72,69,67,null,71,74,79,76,74,null];
 for(let beat=0;beat<64;beat++){
  const time=beat*.5;const chord=chords[Math.floor(beat/8)%4];
  note(chord[beat%4]+12,time,1.4,.23,'sine',beat%2?.35:-.35);
  if(beat%8===0){for(const pitch of chord)note(pitch,time,3.8,.08,'sine');}
  const pitch=melody[beat%32];if(pitch!==null){note(pitch,time,.9,.19);note(pitch+12,time,.7,.024,'sine',.2);}
 }
 const buffer=await offline.startRendering();
 // Fade the loop boundary to avoid clicks.
 for(let channel=0;channel<2;channel++){const data=buffer.getChannelData(channel);for(let i=0;i<rate*.15;i++){const scale=i/(rate*.15);data[i]*=scale;data[data.length-1-i]*=scale;}}
 return buffer;
}
function LocalWeddingMusic({url}){
 const [playing,setPlaying]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState('');const engine=useRef(null),audio=useRef(null),busy=useRef(false),alive=useRef(true);
 useEffect(()=>()=>{alive.current=false;audio.current?.pause();engine.current?.context.close()},[]);
 async function toggle(){
  if(busy.current)return;busy.current=true;setError('');
  try{
   if(url){if(playing){audio.current.pause();setPlaying(false)}else{await audio.current.play();setPlaying(true)}}
   else if(!engine.current){
    setLoading(true);const context=new AudioContext();engine.current={context};await context.resume();const buffer=await makeSoundtrack(context);if(!alive.current)return;
    const source=context.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(context.destination);source.start();engine.current.source=source;setPlaying(true);
   }else if(playing){await engine.current.context.suspend();setPlaying(false)}else{await engine.current.context.resume();setPlaying(true)}
  }catch{if(alive.current){setError('Music could not play. Tap to retry.');engine.current?.context.close();engine.current=null;setPlaying(false)}}finally{busy.current=false;if(alive.current)setLoading(false)}
 }
 return <div className="sound-control">{url&&<audio ref={audio} src={url} loop preload="none"/>}<button onClick={toggle} disabled={loading} aria-label={playing?'Pause wedding music':'Play wedding music'} aria-pressed={playing} className={playing?'sound-playing':''}><span className="sound-bars" aria-hidden="true"><i/><i/><i/><i/></span><span>{loading?'Preparing music…':playing?'Pause music':'Play music'}</span></button>{error&&<span className="sound-error" role="status">{error}</span>}</div>
}
export default function WeddingMusic({url,youtubeId,title='Wedding music'}){
 return youtubeId?<YouTubeMusic videoId={youtubeId} title={title}/>:<LocalWeddingMusic url={url}/>;
}
