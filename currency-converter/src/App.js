import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import "./App.css";

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const BASE_CURRENCY = "EUR";

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${ACCESS_KEY}&base_currency=${BASE_CURRENCY}`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


 console.log(exchangeRate)
  /* console.log(currencyOptions); */

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.data)[0];
        const secondCurrency = Object.keys(data.data)[8]; // EUR
        setCurrencyOptions(Object.keys(data.data));
        setFromCurrency(secondCurrency);
        setToCurrency(firstCurrency);
        setExchangeRate(data.data[firstCurrency])
        console.log(data)
      });
  }, []);

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
      />
    </div>
  );
}

export default App;

/* .then((data) => setCurrencyOptions([data, ...Object.keys(data)])); */
