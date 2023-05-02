import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyOptions, 
    selectedCurrency
  } = props
  return (
    <div>
      <input className='input' type="number"/>
      <select value={selectedCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  );
}
