import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import WorkoutExecution from './pages/WorkoutExecution';
import Analytics from './pages/Analytics';
import AiAssistant from './pages/AiAssistant';
import MusicPlayer from './components/MusicPlayer';
import InstallButton from './components/InstallButton';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container" style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts/:planId" element={<Workouts />} />
          <Route path="/workout/:planId/:dayNumber" element={<WorkoutExecution />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai" element={<AiAssistant />} />
        </Routes>
      </div>
      <MusicPlayer />
      <InstallButton />
    </Router>
  );
}

export default App;
