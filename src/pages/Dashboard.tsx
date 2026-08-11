import { Clock, Flame, Activity } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="neon-text">{getGreeting()}, Athlete!</h1>
          <p className="text-secondary">Ready to crush your goals today?</p>
        </div>
        <button className="btn btn-primary">Start Workout</button>
      </header>

      <section className="dashboard-hero glass-panel">
        <div className="hero-content">
          <h2>"Push harder than yesterday if you want a different tomorrow."</h2>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--accent-color)'}}><Activity size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Workouts</span>
            <span className="stat-value">12</span>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--warning-color)'}}><Clock size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Active Time</span>
            <span className="stat-value">14h</span>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: 'var(--danger-color)'}}><Flame size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Calories Burned</span>
            <span className="stat-value">4,200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
