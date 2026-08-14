import { Link, useLocation } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Dumbbell className="brand-icon" />
          <span>Devin's Fitness Planner</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/calculators" className={`nav-link ${location.pathname.startsWith('/calculators') ? 'active' : ''}`}>
              Calculators
            </Link>
          </li>
          <li>
            <Link to="/exercises" className={`nav-link ${location.pathname.startsWith('/exercises') ? 'active' : ''}`}>
              Exercises
            </Link>
          </li>
          <li>
            <Link to="/single-workouts" className={`nav-link ${location.pathname.startsWith('/single-workouts') ? 'active' : ''}`}>
              Single Workouts
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`nav-link ${location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/workouts') || location.pathname.startsWith('/workout/') ? 'active' : ''}`}>
              Workout Plans
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
