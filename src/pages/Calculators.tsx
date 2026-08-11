import { useState } from 'react';
import './Calculators.css';

export default function Calculators() {
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [rmWeight, setRmWeight] = useState('');
  const [rmReps, setRmReps] = useState('');
  const [rmResult, setRmResult] = useState<number | null>(null);

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
          <h2>BMI Calculator</h2>
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
          <h2>1-Rep Max Calculator</h2>
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
      </div>
    </div>
  );
}
