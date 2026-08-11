import { Link, useLocation } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Dumbbell size={28} className="logo-icon" />
          <span>FitnessPlanner</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`nav-link ${location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/workouts') ? 'active' : ''}`}>
              Workouts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
