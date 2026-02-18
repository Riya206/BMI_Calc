import React, { useState } from 'react';
import UnderweightMen from './assets/Underweight_men.jpg';
import UnderweightWomen from './assets/Underweight_women.jpg';
import ObeseMen from './assets/Obese_men.jpg';
import ObeseWomen from './assets/Obese_women.jpg';
import './App.css';

function App() {
  const [page, setPage] = useState('form');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmiData, setBmiData] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    setBmiData({ bmi, gender });
    setPage('result');
  };

  const handleRecalculate = () => {
    setPage('form');
    setWeight('');
    setHeight('');
    setGender('male');
    setBmiData(null);
  };

  let category = '';
  let image = null;

  if (bmiData) {
    const { bmi } = bmiData;
    if (bmi < 18.5) {
      category = 'Underweight';
      image = gender === 'male' ? UnderweightMen : UnderweightWomen;
    } else if (bmi >= 25) {
      category = 'Obese';
      image = gender === 'male' ? ObeseMen : ObeseWomen;
    } else {
      category = 'Normal weight';
    }
  }

  return (
    <div className="app">
      <h1>BMI Calculator</h1>

      {page === 'form' && (
        <form onSubmit={handleCalculate} className="bmi-form">
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <button type="submit">Calculate BMI</button>
        </form>
      )}

      {page === 'result' && bmiData && (
        <div className="result">
          <p>Your BMI: {bmiData.bmi}</p>
          <p>Category: {category}</p>
          {image && <img src={image} alt={category} style={{ width: '200px', marginTop: '20px' }} />}
          <br />
          <button onClick={handleRecalculate}>Recalculate</button>
        </div>
      )}
    </div>
  );
}

export default App;
