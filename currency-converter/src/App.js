import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import "./App.css";

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${ACCESS_KEY}&base_currency=EUR`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setCurrencyOptions(Object.keys(data.data)));     
  }, []);

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions}/>
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions}/>
    </div>
  );
}

export default App;


/* .then((data) => setCurrencyOptions([data, ...Object.keys(data)])); */