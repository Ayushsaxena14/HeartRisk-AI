import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function App() {
  const [formData, setFormData] = useState({
    age: '', gender: '', systolic_bp: '', diastolic_bp: '',
    cholesterol: '', glucose: '', smoker: '', alcoholic: '', active: ''
  });
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(response.data.risk);
      fetchHistory();
    } catch (err) {
      console.error('Error:', err.response?.data?.error || err.message);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/history');
      setHistory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const chartData = {
    labels: history.map((_, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Systolic BP',
        data: history.map((entry) => entry[3]),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Diastolic BP',
        data: history.map((entry) => entry[4]),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  return (
    <div className="App">
      <h1>Cardiovascular Risk Assessment</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(key => (
          <input key={key} type="number" name={key} placeholder={key} value={formData[key]} onChange={handleChange} required />
        ))}
        <button type="submit">Predict Risk</button>
      </form>
      {result && <h2>Risk Level: {result}</h2>}

      <h2>Prediction History</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default App;