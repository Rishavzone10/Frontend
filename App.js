import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('http://localhost:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data.data }),
      });

      const result = await res.json();
      setResponse(result);

    } catch (error) {
      setErrorMessage('Invalid JSON input. Please try again.');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header>
        <h1>BFHL Frontend</h1>
        <p className="info">Name: Rishav Srivastav</p>
        <p className="info">Registration Number: 21BKT0088</p>
      </header>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder='Enter JSON e.g., { "data": ["A", "B", "1"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
      {errorMessage && <p className="error">{errorMessage}</p>}
      
      {response && (
        <>
          <h2>Select Response Filters:</h2>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest lowercase alphabet
          </label>

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
