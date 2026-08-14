import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Target } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Online Workout Planner</h1>
          <p className="hero-subtitle">
            The ultimate web-based app that allows you to create a custom workout plan based on your personal preference and track your targeted muscles.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-xl">
              Start Your Plan <ArrowRight size={20} className="inline-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="text-center mb-12 fade-in">
          <h2>Why use Devin's Fitness Planner?</h2>
          <p>Everything you need to build muscle, lose weight, and stay consistent.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Activity size={32} /></div>
            <h3>3D Muscle Tracking</h3>
            <p>See exactly which primary and secondary muscles you are targeting with our interactive 2D anatomical models.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Calendar size={32} /></div>
            <h3>30-Day Programs</h3>
            <p>Follow structured routines tailored to your experience level, from complete beginner to incredible athlete.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Target size={32} /></div>
            <h3>Custom Intensity</h3>
            <p>You control the workout. Easily adjust exercise duration and number of rounds before you hit start.</p>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="inspiration-section">
        <div className="inspiration-content">
          <h2>Ready to transform your body?</h2>
          <Link to="/dashboard" className="btn btn-primary btn-large">
            Explore Workouts
          </Link>
        </div>
      </section>
    </div>
  );
}
