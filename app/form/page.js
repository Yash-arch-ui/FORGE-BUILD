"use client";
import React, { useState } from 'react';

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
        YO:
      </label>
      <input
        type="text"
        id="inputField"
        placeholder="       Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}