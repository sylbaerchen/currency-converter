import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import "./App.css";

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const BASE_CURRENCY = "EUR";

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${ACCESS_KEY}`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`${BASE_URL}&base_currency=${BASE_CURRENCY}`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.data)[0];
        const secondCurrency = Object.keys(data.data)[8]; // EUR
        setCurrencyOptions(Object.keys(data.data));
        setFromCurrency(secondCurrency);
        setToCurrency(firstCurrency);
        setExchangeRate(data.data[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null)
      fetch(
        `${BASE_URL}&base_currency=${fromCurrency}&currencies=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.data[toCurrency]));
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      <h1>Convert Currency</h1>
      <div className="calc-container">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">
          <img src="/left-right.png" alt="arrows"></img>
        </div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}

export default App;
