import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import './MusicPlayer.css';

const TRACKS = [
  { id: 1, title: 'Electronic Pulse', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b827e8a9.mp3?filename=electronic-future-beats-117997.mp3' },
  { id: 2, title: 'Gym Energy', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=workout-motivation-114972.mp3' }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="music-player glass-panel">
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrackIndex].url} 
        onEnded={nextTrack}
      />
      <div className="player-info">
        <div className="player-icon"><Music size={16} /></div>
        <div className="track-title">{TRACKS[currentTrackIndex].title}</div>
      </div>
      <div className="player-controls">
        <button onClick={prevTrack} className="player-btn"><SkipBack size={16} /></button>
        <button onClick={togglePlay} className="player-btn primary">
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={nextTrack} className="player-btn"><SkipForward size={16} /></button>
      </div>
    </div>
  );
}
