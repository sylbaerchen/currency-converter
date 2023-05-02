import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import "./App.css";

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
console.log(ACCESS_KEY);

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${ACCESS_KEY}&base_currency=EUR`;

function App() {
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </div>
  );
}

export default App;
