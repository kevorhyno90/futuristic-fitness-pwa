import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { sampleWorkouts } from '../data/exercises';
import type { Exercise } from '../data/exercises';
import './WorkoutExecution.css';

export default function WorkoutExecution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workout = sampleWorkouts.find(w => w.id === id);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Combine all exercises into a linear sequence for easier navigation
  const allExercises: { phase: string; exercise: Exercise }[] = [];
  if (workout) {
    workout.warmUp.forEach(e => allExercises.push({ phase: 'warmUp', exercise: e }));
    workout.main.forEach(e => allExercises.push({ phase: 'main', exercise: e }));
    workout.coolDown.forEach(e => allExercises.push({ phase: 'coolDown', exercise: e }));
  }

  const current = allExercises[exerciseIndex];
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (current) {
      setTimeLeft(current.exercise.durationSeconds);
      setIsActive(false); // Pause timer initially
      speak(`Up next: ${current.exercise.name}. ${current.exercise.description}. Ready, go!`);
    }
  }, [exerciseIndex, current, voiceEnabled]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleNext();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (voiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setIsActive(true); // Auto-start timer when done speaking
        };
        window.speechSynthesis.speak(utterance);
      } else {
        // If voice is disabled, just auto-start after a brief delay
        setTimeout(() => setIsActive(true), 1500);
      }
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const handleNext = () => {
    if (exerciseIndex < allExercises.length - 1) {
      setExerciseIndex(prev => prev + 1);
      setIsActive(false);
    } else {
      // Finished
      speak("Workout complete! Great job today.");
      navigate('/dashboard');
    }
  };

  if (!workout || !current) return <div>Workout not found</div>;

  const progressPercentage = ((current.exercise.durationSeconds - timeLeft) / current.exercise.durationSeconds) * 100;

  return (
    <div className="execution-container">
      <header className="execution-header">
        <div>
          <span className="phase-badge">{current.phase.toUpperCase()}</span>
          <h1>{current.exercise.name}</h1>
        </div>
        <button className="btn-icon" onClick={() => setVoiceEnabled(!voiceEnabled)}>
          {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </header>

      <div className="visual-area glass-panel">
        {current.exercise.imageUrl && (
          <img src={current.exercise.imageUrl} alt={current.exercise.name} className="exercise-img" />
        )}
      </div>

      <div className="timer-area glass-panel">
        <div className="timer-display neon-text">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="controls-area">
        <button className="btn btn-primary control-btn" onClick={toggleTimer}>
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button className="btn btn-outline control-btn" onClick={handleNext}>
          <SkipForward size={32} />
        </button>
        <button className="btn btn-primary control-btn" onClick={() => handleNext()}>
          <CheckCircle size={32} /> Done
        </button>
      </div>
    </div>
  );
}
