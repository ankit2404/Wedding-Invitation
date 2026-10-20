import React from 'react';
import './youtube-music.css';

export default function YouTubeMusic({videoId,title}){
 if(!/^[a-zA-Z0-9_-]{11}$/.test(videoId))return null;
 return <div className="youtube-dock"><a className="music-launch" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${title} on YouTube, opens a new tab`} title="Listen on YouTube"><span className="youtube-note" aria-hidden="true">♫</span><span>{title}</span><span aria-hidden="true">↗</span></a></div>;
}
