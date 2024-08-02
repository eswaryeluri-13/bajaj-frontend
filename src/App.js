import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

// Multi-select dropdown options
const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" }
];

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post('https://bajaj-backend-8czi.onrender.com/bfhl', parsedData);
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or server error');
      setResponseData(null);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const selectedValues = selectedFilters.map(option => option.value);

    return (
      <div>
        <h3>Filter Response</h3>
        <div>
          {selectedValues.includes("alphabets") && (
            <div>
              <h4>Alphabets</h4>
              <p>{responseData.alphabets.join(', ')}</p>
            </div>
          )}
          {selectedValues.includes("numbers") && (
            <div>
              <h4>Numbers</h4>
              <p>{responseData.numbers.join(', ')}</p>
            </div>
          )}
          {selectedValues.includes("highest_alphabet") && (
            <div>
              <h4>Highest Alphabet</h4>
              <p>{responseData.highest_alphabet.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        className="json-input"
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
      />
      
      <div className="multi-filter-container">
        <h2>Multi Filter</h2>
        <Select
          options={options}
          isMulti
          onChange={handleFilterChange}
          value={selectedFilters}
          className="multi-select"
        />
      </div>
      
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {renderFilteredResponse()}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
