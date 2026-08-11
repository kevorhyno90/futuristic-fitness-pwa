import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import './MusicPlayer.css';

const TRACKS = [
  { id: 1, title: 'Electronic Pulse', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Gym Energy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Deep Focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Cardio Rhythm', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Power Lift', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'Cool Down', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Endurance', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Audio playback error:', error);
            setIsPlaying(false);
          }
        });
      }
    } else {
      audio.pause();
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
