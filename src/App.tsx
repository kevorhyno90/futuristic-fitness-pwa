import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Workouts from './pages/Workouts';
import WorkoutExecution from './pages/WorkoutExecution';
import Analytics from './pages/Analytics';
import AiAssistant from './pages/AiAssistant';
import MusicPlayer from './components/MusicPlayer';
import InstallButton from './components/InstallButton';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workout/:id" element={<WorkoutExecution />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai" element={<AiAssistant />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <MusicPlayer />
        <InstallButton />
      </div>
    </Router>
  );
}

export default App;
