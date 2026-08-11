import { Link, useLocation } from 'react-router-dom';
import { Activity, Home, Settings, Moon, Sun, Dumbbell, Brain } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Sidebar({ theme, toggleTheme }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <Activity size={20} /> },
    { name: 'FitAI', path: '/ai', icon: <Brain size={20} /> },
  ];

  return (
    <aside className="sidebar glass-nav">
      <div className="sidebar-header">
        <h2 className="text-gradient">FitAI</h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link to="/settings" className="btn-icon">
          <Settings size={20} />
        </Link>
      </div>
    </aside>
  );
}
