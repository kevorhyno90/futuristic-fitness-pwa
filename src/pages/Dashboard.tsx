import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, Flame, Trophy } from 'lucide-react';
import './Dashboard.css';

const planImages = {
  beginner: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
  advanced: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
  experienced: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
  incredible: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop'
};

export default function Dashboard() {
  const navigate = useNavigate();

  const renderDifficultyCard = (id: string, title: string, desc: string, Icon: any, image: string) => (
    <div className="plan-card" onClick={() => navigate(`/workouts/${id}`)}>
      <div className="plan-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="plan-overlay">
          <Icon size={48} className="plan-icon" />
          <h2 className="plan-title">{title}</h2>
        </div>
      </div>
      <div className="plan-content">
        <p className="plan-desc">{desc}</p>
        <button className="btn btn-primary w-full">View Program</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Select Your Program</h1>
        <p>Choose a 30-day plan tailored to your fitness level.</p>
      </div>
      <div className="plans-grid">
        {renderDifficultyCard('beginner', 'Beginner', 'Perfect for those just starting out. 20-minute daily routines focused on form.', Dumbbell, planImages.beginner)}
        {renderDifficultyCard('advanced', 'Advanced', 'Step up your game. 30-minute intense workouts to build stamina and strength.', Activity, planImages.advanced)}
        {renderDifficultyCard('experienced', 'Experienced', 'For regular gym-goers. 40-minute grueling routines testing your limits.', Flame, planImages.experienced)}
        {renderDifficultyCard('incredible', 'Incredible', 'The ultimate challenge. 60-minute absolute destruction. Only for the brave.', Trophy, planImages.incredible)}
      </div>
    </div>
  );
}
