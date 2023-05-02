import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyOptions, 
    selectedCurrency, 
    onChangeCurrency
  } = props
  return (
    <div>
      <input className='input' type="number"/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  );
}
