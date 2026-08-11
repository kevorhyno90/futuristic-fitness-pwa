import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Flame, Trophy } from 'lucide-react';
import { workoutPlans } from '../data/exercises';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'beginner': return <Activity size={32} color="#3b82f6" />;
      case 'advanced': return <Zap size={32} color="#10b981" />;
      case 'experienced': return <Flame size={32} color="#f59e0b" />;
      case 'incredible': return <Trophy size={32} color="#ef4444" />;
      default: return <Activity size={32} />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="neon-text">{getGreeting()}, Athlete!</h1>
          <p className="text-secondary">Select your 30-Day challenge.</p>
        </div>
      </header>

      <div className="plan-grid">
        {workoutPlans.map(plan => (
          <div 
            key={plan.id} 
            className="plan-card glass-panel"
            onClick={() => navigate(`/workouts/${plan.id}`)}
          >
            <div className="plan-icon">
              {getIcon(plan.id)}
            </div>
            <div className="plan-info">
              <h2>{plan.title}</h2>
              <p>{plan.description}</p>
            </div>
            <button className="btn btn-primary plan-btn">Start</button>
          </div>
        ))}
      </div>
    </div>
  );
}
