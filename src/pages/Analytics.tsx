import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getWeightHistory, saveWeight, WeightRecord } from '../data/db';
import './Analytics.css';

export default function Analytics() {
  const [weightData, setWeightData] = useState<WeightRecord[]>([]);
  const [newWeight, setNewWeight] = useState('');

  const loadData = async () => {
    const data = await getWeightHistory();
    setWeightData(data);
  };

  useEffect(() => {
    loadData();
    getWeightHistory().then(data => {
      if(data.length === 0) {
        const dummy = [
          { date: new Date(Date.now() - 5 * 86400000).toISOString(), weight: 80 },
          { date: new Date(Date.now() - 3 * 86400000).toISOString(), weight: 79 },
          { date: new Date(Date.now() - 1 * 86400000).toISOString(), weight: 78.5 },
        ];
        Promise.all(dummy.map(d => saveWeight(d.weight))).then(loadData);
      }
    });
  }, []);

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    await saveWeight(parseFloat(newWeight));
    setNewWeight('');
    loadData();
  };

  const formattedData = weightData.map(d => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>Health Analytics</h1>
        <p className="text-secondary">Track your progress and stay consistent.</p>
      </header>

      <div className="analytics-content">
        <div className="chart-card glass-panel">
          <h2>Weight Progression</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={formattedData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="displayDate" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" domain={['dataMin - 5', 'dataMax + 5']} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent-color)' }}
                />
                <Area type="monotone" dataKey="weight" stroke="var(--accent-color)" fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="log-card glass-panel">
          <h2>Log Today's Weight</h2>
          <form onSubmit={handleAddWeight} className="log-form">
            <input 
              type="number" 
              step="0.1" 
              value={newWeight} 
              onChange={e => setNewWeight(e.target.value)} 
              placeholder="e.g. 75.5" 
              className="form-input"
            />
            <button type="submit" className="btn btn-primary">Save Entry</button>
          </form>
        </div>
      </div>
    </div>
  );
}
