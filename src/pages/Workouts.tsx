import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workoutPlans } from '../data/exercises';
import { getCompletedDays } from '../data/db';
import type { CompletedDayRecord } from '../data/db';
import { CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import './Workouts.css';

export default function Workouts() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [completedDays, setCompletedDays] = useState<CompletedDayRecord[]>([]);

  const plan = workoutPlans.find(p => p.id === planId);

  useEffect(() => {
    const loadCompleted = async () => {
      const days = await getCompletedDays();
      // Filter by the current plan
      setCompletedDays(days.filter(d => d.planId === planId));
    };
    loadCompleted();
  }, [planId]);

  if (!plan) return <div className="p-4">Plan not found</div>;

  const isDayCompleted = (dayNumber: number) => {
    return completedDays.some(d => d.dayNumber === dayNumber);
  };

  const isDayLocked = (dayNumber: number) => {
    return false;
  };

  const handleDayClick = (dayNumber: number, isRestDay: boolean) => {
    if (isRestDay) return;
    if (isDayLocked(dayNumber)) return;
    navigate(`/workout/${planId}/${dayNumber}`);
  };

  return (
    <div className="workouts-page">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} /> Back to Categories
      </button>

      <header className="workouts-header">
        <h1>{plan.title}</h1>
        <p>{plan.description}</p>
        
        <div className="progress-summary glass-panel">
          <div className="stat">
            <span className="stat-value">{completedDays.length}</span>
            <span className="stat-label">Days Completed</span>
          </div>
          <div className="stat">
            <span className="stat-value">30</span>
            <span className="stat-label">Total Days</span>
          </div>
        </div>
      </header>

      <div className="calendar-grid">
        {plan.days.map((day) => {
          const completed = isDayCompleted(day.dayNumber);
          const locked = isDayLocked(day.dayNumber);
          
          let statusClass = '';
          if (completed) statusClass = 'completed';
          else if (day.isRestDay) statusClass = 'rest-day';
          else if (locked) statusClass = 'locked';
          else statusClass = 'available';

          return (
            <div 
              key={day.dayNumber} 
              className={`calendar-day glass-panel ${statusClass}`}
              onClick={() => handleDayClick(day.dayNumber, day.isRestDay)}
            >
              <span className="day-number">Day {day.dayNumber}</span>
              
              {completed && <CheckCircle className="status-icon text-green" size={24} />}
              {locked && !completed && !day.isRestDay && <Lock className="status-icon" size={20} />}
              
              {day.isRestDay && <span className="rest-label">REST</span>}
              {!day.isRestDay && !completed && <span className="calorie-label">{day.caloriesBurned} Cal</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
