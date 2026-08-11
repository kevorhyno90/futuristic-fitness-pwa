import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, CheckCircle } from 'lucide-react';
import Model from 'react-body-highlighter';
import { workoutPlans } from '../data/exercises';
import type { Exercise } from '../data/exercises';
import { saveCompletedDay } from '../data/db';
import './WorkoutExecution.css';

type QueueItem = 
  | { type: 'exercise'; exercise: Exercise }
  | { type: 'rest'; nextExerciseName: string; duration: number };

const playBeep = (freq = 440, duration = 300) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration/1000);
    osc.stop(ctx.currentTime + duration/1000);
  } catch (e) { console.error('AudioContext error', e); }
};

const playStartBeep = () => playBeep(880, 500);
const playStopBeep = () => playBeep(300, 800);

export default function WorkoutExecution() {
  const { planId, dayNumber: dayNumberStr } = useParams();
  const navigate = useNavigate();
  const dayNumber = parseInt(dayNumberStr || '1', 10);
  
  const plan = workoutPlans.find(p => p.id === planId);
  const dayPlan = plan?.days.find(d => d.dayNumber === dayNumber);
  
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const [workoutStatus, setWorkoutStatus] = useState<'setup' | 'running' | 'finished'>('setup');
  const [customDuration, setCustomDuration] = useState<number>(0);
  const [customRounds, setCustomRounds] = useState<number>(1);

  const handleStartWorkout = () => {
    if (!dayPlan || dayPlan.isRestDay) return;
    
    const newQueue: QueueItem[] = [];
    for (let r = 0; r < customRounds; r++) {
      dayPlan.exercises.forEach((ex, idx) => {
        const modifiedExercise = { ...ex, durationSeconds: customDuration > 0 ? customDuration : ex.durationSeconds };
        newQueue.push({ type: 'exercise', exercise: modifiedExercise });
        
        if (idx < dayPlan.exercises.length - 1 || r < customRounds - 1) {
           const nextEx = idx < dayPlan.exercises.length - 1 ? dayPlan.exercises[idx + 1] : dayPlan.exercises[0];
           newQueue.push({ type: 'rest', nextExerciseName: nextEx.name, duration: 10 });
        }
      });
    }
    setQueue(newQueue);
    setWorkoutStatus('running');
  };

  const current = queue[queueIndex];

  useEffect(() => {
    if (!current) return;
    
    setIsActive(false); 
    
    if (current.type === 'exercise') {
      setTimeLeft(current.exercise.durationSeconds);
    } else {
      setTimeLeft(current.duration);
    }
    
    // Auto-start after a brief 1.5s delay for visual focus
    const timer = setTimeout(() => {
      playStartBeep();
      setIsActive(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [queueIndex, current]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            playStopBeep();
            handleNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (queueIndex < queue.length - 1) {
      setQueueIndex(prev => prev + 1);
    } else {
      finishDay();
    }
  };
  
  const finishDay = async () => {
    setWorkoutStatus('finished');
    setIsActive(false);
    if (planId && dayPlan && !dayPlan.isRestDay) {
       await saveCompletedDay(planId, dayNumber, dayPlan.caloriesBurned * customRounds);
    }
  };

  if (!dayPlan) return <div className="p-4 text-center mt-8">Day not found</div>;
  if (dayPlan.isRestDay) return (
    <div className="workout-execution finished">
      <h1 className="neon-text">Rest Day</h1>
      <p className="mt-4 text-lg">Your muscles need time to recover. Enjoy your rest!</p>
      <button className="btn btn-primary mt-6" onClick={() => navigate(`/workouts/${planId}`)}>Back to Plan</button>
    </div>
  );

  if (workoutStatus === 'setup') {
    return (
      <div className="workout-execution setup-phase">
        <h1 className="neon-text" style={{ marginBottom: '2rem' }}>Customize Workout</h1>
        
        <div className="config-card glass-panel">
          <h3 className="config-title">Exercise Duration</h3>
          <div className="options-grid">
            {[0, 20, 30, 45, 60, 90, 120].map(val => (
              <button 
                key={val} 
                className={`config-btn ${customDuration === val ? 'active' : ''}`}
                onClick={() => setCustomDuration(val)}
              >
                {val === 0 ? 'Plan Default' : val >= 60 ? `${val/60}m` : `${val}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="config-card glass-panel" style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
          <h3 className="config-title">Number of Rounds</h3>
          <div className="options-grid">
            {[1, 2, 3, 4, 5].map(val => (
              <button 
                key={val} 
                className={`config-btn ${customRounds === val ? 'active' : ''}`}
                onClick={() => setCustomRounds(val)}
              >
                {val} {val === 1 ? 'Round' : 'Rounds'}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-large" onClick={handleStartWorkout} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>
          INITIALIZE SEQUENCE
        </button>
      </div>
    );
  }

  if (workoutStatus === 'finished') {
    return (
      <div className="workout-execution finished">
        <CheckCircle size={80} className="text-green mb-4" />
        <h1 className="neon-text">Day {dayNumber} Complete!</h1>
        <p className="mt-4 text-lg">Great job! You burned {dayPlan.caloriesBurned * customRounds} calories today.</p>
        <button className="btn btn-primary mt-8" onClick={() => navigate(`/workouts/${planId}`)}>
          Return to Calendar
        </button>
      </div>
    );
  }

  if (!current) return <div>Loading...</div>;

  const isRest = current.type === 'rest';

  return (
    <div className="workout-execution">
      <div className="execution-header">
        <div className="workout-progress" style={{ margin: '0 auto' }}>
          Step {queueIndex + 1} of {queue.length}
        </div>
      </div>

      <div className={`exercise-display glass-panel ${isRest ? 'is-rest' : ''}`}>
        {isRest ? (
          <div className="rest-display">
            <h2>REST</h2>
            <p>Up Next: {current.nextExerciseName}</p>
          </div>
        ) : (
          <>
            {current.exercise.imageUrl && (
              <div className="image-wrapper">
                 <img src={current.exercise.imageUrl} alt={current.exercise.name} className="exercise-image" />
              </div>
            )}
            <h2 className="exercise-title">{current.exercise.name}</h2>
            {current.exercise.muscles && (
              <div className="exercise-muscles-visual">
                <span className="muscle-label">Targeted Muscles</span>
                <div className="models-container">
                  <Model
                    data={[{ name: current.exercise.name, muscles: current.exercise.muscles as any }]}
                    style={{ width: '8rem', height: '12rem' }}
                    highlightedColors={['#ef4444', '#ef4444']}
                    type="anterior"
                  />
                  <Model
                    data={[{ name: current.exercise.name, muscles: current.exercise.muscles as any }]}
                    style={{ width: '8rem', height: '12rem' }}
                    highlightedColors={['#ef4444', '#ef4444']}
                    type="posterior"
                  />
                </div>
              </div>
            )}
            <p className="exercise-description">{current.exercise.description}</p>
          </>
        )}
      </div>

      <div className="timer-section">
        <div className="timer-display neon-text" style={{ color: isRest ? 'var(--warning-color)' : 'var(--primary-color)' }}>
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="execution-controls">
        <button className="btn btn-secondary icon-btn-large" onClick={() => setIsActive(!isActive)}>
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button className="btn btn-secondary icon-btn-large" onClick={handleNext}>
          <SkipForward size={32} />
        </button>
      </div>
    </div>
  );
}
