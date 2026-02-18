import React, { useState } from 'react';
import UnderweightMen from './assets/Underweight_men.jpg';
import UnderweightWomen from './assets/Underweight_women.jpg';
import ObeseMen from './assets/Obese_men.jpg';
import ObeseWomen from './assets/Obese_women.jpg';
import RegularweightMen from './assets/Regularweight_men.jpg';
import RegularweightWomen from './assets/Regularweight_women.jpg';
import './App.css';

function App() {
  const [page, setPage] = useState('form');
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'inch'
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lb'
  const [gender, setGender] = useState('male');
  const [bmiData, setBmiData] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    // Convert height to meters
    let heightInMeters = heightUnit === 'cm' ? height / 100 : (height * 2.54) / 100;

    // Convert weight to kg
    let weightInKg = weightUnit === 'kg' ? weight : weight * 0.453592;

    const bmi = (weightInKg / (heightInMeters ** 2)).toFixed(2);
    setBmiData({ bmi, gender });
    setPage('result');
  };

  const handleRecalculate = () => {
    setPage('form');
    setName('');
    setWeight('');
    setHeight('');
    setHeightUnit('cm');
    setWeightUnit('kg');
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
      image = gender === 'male' ? RegularweightMen : RegularweightWomen;
    }
  }

  return (
    <div className="app">
      <h1>BMI Calculator</h1>

      {page === 'form' && (
        <form onSubmit={handleCalculate} className="bmi-form">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />

          <label>
            Weight:
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </label>
          <br />

          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>
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
          <p>{name}, Your BMI is {bmiData.bmi}</p>
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
