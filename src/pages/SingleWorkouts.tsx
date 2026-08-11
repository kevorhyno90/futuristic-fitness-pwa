import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { singleWorkouts } from '../data/exercises';
import './SingleWorkouts.css';

export default function SingleWorkouts() {
  const navigate = useNavigate();

  return (
    <div className="single-workouts-container">
      <div className="dashboard-header">
        <h1>Single Workouts</h1>
        <p>Short on time? Pick a one-off routine and get sweating immediately.</p>
      </div>

      <div className="workouts-grid">
        {singleWorkouts.map(workout => (
          <div key={workout.id} className="single-workout-card">
            {workout.imageUrl && (
              <div className="workout-card-image" style={{ backgroundImage: `url(${workout.imageUrl})` }}></div>
            )}
            <div className="workout-card-content">
              <div className="card-header">
                <h2>{workout.title}</h2>
                <span className="calorie-badge">{workout.caloriesBurned} kcal</span>
              </div>
              <p className="description">{workout.description}</p>
              
              <div className="exercise-list-preview">
                <p className="preview-title">Includes {workout.exercises.length} exercises:</p>
              <ul>
                {workout.exercises.slice(0, 3).map(ex => (
                  <li key={ex.id}>{ex.name}</li>
                ))}
                {workout.exercises.length > 3 && (
                  <li>+ {workout.exercises.length - 3} more</li>
                )}
              </ul>
              </div>

              <button 
                className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
                onClick={() => navigate(`/workout/single/${workout.id}`)}
              >
                <Play size={18} /> Start Workout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
