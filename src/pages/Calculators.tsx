import { useState } from 'react';
import { Scale, Dumbbell, Activity, Flame } from 'lucide-react';
import './Calculators.css';

export default function Calculators() {
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [rmWeight, setRmWeight] = useState('');
  const [rmReps, setRmReps] = useState('');
  const [rmResult, setRmResult] = useState<number | null>(null);

  const [bfiAge, setBfiAge] = useState('');
  const [bfiGender, setBfiGender] = useState('1'); // 1=Male, 0=Female
  const [bfiWeight, setBfiWeight] = useState('');
  const [bfiHeight, setBfiHeight] = useState('');
  const [bfiResult, setBfiResult] = useState<number | null>(null);

  const [tdeeAge, setTdeeAge] = useState('');
  const [tdeeGender, setTdeeGender] = useState('1'); // 1=Male, 0=Female
  const [tdeeWeight, setTdeeWeight] = useState('');
  const [tdeeHeight, setTdeeHeight] = useState('');
  const [tdeeActivity, setTdeeActivity] = useState('1.2');
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; // cm to m
    if (w > 0 && h > 0) {
      setBmiResult(w / (h * h));
    }
  };

  const calculate1RM = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(rmWeight);
    const r = parseInt(rmReps);
    if (w > 0 && r > 0) {
      // Epley Formula: 1RM = Weight * (1 + Reps/30)
      setRmResult(w * (1 + r / 30));
    }
  };

  const calculateBFI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(bfiWeight);
    const h = parseFloat(bfiHeight) / 100;
    const a = parseFloat(bfiAge);
    const g = parseFloat(bfiGender);
    if (w > 0 && h > 0 && a > 0) {
      const bmi = w / (h * h);
      // Simplified Body Fat Formula based on BMI
      const bf = (1.20 * bmi) + (0.23 * a) - (10.8 * g) - 5.4;
      setBfiResult(Math.max(2, bf)); // Cap minimum at 2%
    }
  };

  const calculateTDEE = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(tdeeWeight);
    const h = parseFloat(tdeeHeight);
    const a = parseFloat(tdeeAge);
    const g = parseFloat(tdeeGender);
    const act = parseFloat(tdeeActivity);
    
    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += (g === 1) ? 5 : -161;
      setTdeeResult(bmr * act);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="calculators-container">
      <div className="dashboard-header">
        <h1>Fitness Calculators</h1>
        <p>Essential tools to measure your progress and plan your workouts.</p>
      </div>

      <div className="calculators-grid">
        {/* BMI Calculator */}
        <div className="calculator-card">
          <div className="calc-card-header">
            <Scale size={24} className="calc-icon" />
            <h2>BMI Calculator</h2>
          </div>
          <p className="text-secondary mb-4">Calculate your Body Mass Index.</p>
          <form onSubmit={calculateBMI} className="calc-form">
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} placeholder="e.g. 70" required />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} placeholder="e.g. 175" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Calculate BMI</button>
          </form>
          {bmiResult !== null && (
            <div className="calc-result">
              <h3>{bmiResult.toFixed(1)}</h3>
              <p>Category: {getBMICategory(bmiResult)}</p>
            </div>
          )}
        </div>

        {/* 1RM Calculator */}
        <div className="calculator-card">
          <div className="calc-card-header">
            <Dumbbell size={24} className="calc-icon" />
            <h2>1-Rep Max Calculator</h2>
          </div>
          <p className="text-secondary mb-4">Estimate your 1RM based on your lifts.</p>
          <form onSubmit={calculate1RM} className="calc-form">
            <div className="form-group">
              <label>Weight Lifted (kg/lbs)</label>
              <input type="number" value={rmWeight} onChange={(e) => setRmWeight(e.target.value)} placeholder="e.g. 100" required />
            </div>
            <div className="form-group">
              <label>Repetitions</label>
              <input type="number" value={rmReps} onChange={(e) => setRmReps(e.target.value)} placeholder="e.g. 5" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Calculate 1RM</button>
          </form>
          {rmResult !== null && (
            <div className="calc-result">
              <h3>{rmResult.toFixed(1)}</h3>
              <p>Estimated 1-Rep Max</p>
            </div>
          )}
        </div>

        {/* Body Fat Index Calculator */}
        <div className="calculator-card">
          <div className="calc-card-header">
            <Activity size={24} className="calc-icon" />
            <h2>Body Fat Index</h2>
          </div>
          <p className="text-secondary mb-4">Estimate your Body Fat Percentage.</p>
          <form onSubmit={calculateBFI} className="calc-form">
            <div className="form-group">
              <label>Gender</label>
              <select value={bfiGender} onChange={(e) => setBfiGender(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Age (years)</label>
              <input type="number" value={bfiAge} onChange={(e) => setBfiAge(e.target.value)} placeholder="e.g. 25" required />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" value={bfiWeight} onChange={(e) => setBfiWeight(e.target.value)} placeholder="e.g. 70" required />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" value={bfiHeight} onChange={(e) => setBfiHeight(e.target.value)} placeholder="e.g. 175" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Calculate BFI</button>
          </form>
          {bfiResult !== null && (
            <div className="calc-result">
              <h3>{bfiResult.toFixed(1)}%</h3>
              <p>Estimated Body Fat</p>
            </div>
          )}
        </div>

        {/* Daily Calorie Calculator (TDEE) */}
        <div className="calculator-card">
          <div className="calc-card-header">
            <Flame size={24} className="calc-icon" />
            <h2>Daily Calories (TDEE)</h2>
          </div>
          <p className="text-secondary mb-4">Calculate daily calories to maintain weight.</p>
          <form onSubmit={calculateTDEE} className="calc-form">
            <div className="form-group">
              <label>Gender</label>
              <select value={tdeeGender} onChange={(e) => setTdeeGender(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Age (years)</label>
              <input type="number" value={tdeeAge} onChange={(e) => setTdeeAge(e.target.value)} placeholder="e.g. 25" required />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" value={tdeeWeight} onChange={(e) => setTdeeWeight(e.target.value)} placeholder="e.g. 70" required />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" value={tdeeHeight} onChange={(e) => setTdeeHeight(e.target.value)} placeholder="e.g. 175" required />
            </div>
            <div className="form-group">
              <label>Activity Level</label>
              <select value={tdeeActivity} onChange={(e) => setTdeeActivity(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg">
                <option value="1.2">Sedentary (office job)</option>
                <option value="1.375">Light Exercise (1-2 days/week)</option>
                <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                <option value="1.725">Heavy Exercise (6-7 days/week)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Calculate TDEE</button>
          </form>
          {tdeeResult !== null && (
            <div className="calc-result">
              <h3>{Math.round(tdeeResult)} kcal</h3>
              <p>Maintenance Calories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
