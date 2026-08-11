import { useState } from 'react';
import { Search } from 'lucide-react';
import { allExercises } from '../data/exercises';
import Model from 'react-body-highlighter';
import './Exercises.css';

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = allExercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (ex.muscles && ex.muscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="exercises-container">
      <div className="dashboard-header">
        <h1>Exercise Library</h1>
        <p>Browse our complete database of exercises and targeted muscles.</p>
      </div>

      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search by exercise name or muscle (e.g., Chest, Squat)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="exercises-grid">
        {filteredExercises.map(ex => (
          <div key={ex.id} className="exercise-card">
            <div className="exercise-img-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src={ex.imageUrl || `/exercises/${ex.id}.gif`} alt={ex.name} style={{ width: '50%', objectFit: 'contain' }} />
              <div style={{ width: '45%', display: 'flex', justifyContent: 'center' }}>
                <Model
                  data={ex.muscles ? ex.muscles.map(m => ({ name: m, exercises: [ex.name] })) : []}
                  style={{ width: '8rem', height: '12rem' }}
                  highlightedColors={['#ef4444', '#ef4444']}
                  type="anterior"
                />
              </div>
            </div>
            <div className="exercise-info">
              <h3>{ex.name}</h3>
              {ex.muscles && ex.muscles.length > 0 && (
                <div className="muscle-tags">
                  {ex.muscles.map(m => (
                    <span key={m} className="muscle-tag">{m}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredExercises.length === 0 && (
          <div className="no-results">
            <p>No exercises found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
