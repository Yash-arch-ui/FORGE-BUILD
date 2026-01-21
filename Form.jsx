// src/components/Form.jsx
import React, { useState } from 'react';
import './Form.css';

export default function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${inputValue}`);
    setInputValue('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="inputField">
        Add a form and update UI using useState
      </label>
      <input
        type="text"
        id="inputField"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
