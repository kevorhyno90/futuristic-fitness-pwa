import { Link } from 'react-router-dom';
import { sampleWorkouts } from '../data/exercises';
import './Workouts.css';

export default function Workouts() {
  return (
    <div className="workouts-container">
      <header className="workouts-header">
        <h1>Workout Programs</h1>
        <p className="text-secondary">Choose a plan to hit your goals today.</p>
      </header>
      
      <div className="workouts-grid">
        {sampleWorkouts.map(workout => (
          <div key={workout.id} className="workout-card glass-panel">
            <div className="workout-card-header">
              <span className={`badge badge-${workout.difficulty.toLowerCase()}`}>
                {workout.difficulty}
              </span>
              <span className="badge badge-category">{workout.category}</span>
            </div>
            <h2>{workout.title}</h2>
            <p className="text-secondary">{workout.description}</p>
            <div className="workout-stats">
              <span>{workout.warmUp.length + workout.main.length + workout.coolDown.length} Exercises</span>
            </div>
            <Link to={`/workout/${workout.id}`} className="btn btn-primary" style={{marginTop: '1.5rem', width: '100%'}}>
              Start Routine
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
