import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Block from './components/Block';

function App() {
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  const currencyRates = useRef({});

  useEffect(() => {
    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_GS8dS2K67OcdmsHPCGUFFUNaVT4OLSm6Ded0d7Hr')
    .then(response => {
      if (!response.ok) {
        throw new Error ("Error occured: " + response.status);
      }
      return response.json();
    })
    .then(json => {
      currencyRates.current = json.data;
      console.log(json);
      console.log(json.data);
      console.log(currencyRates.current);
    })
    .catch(error => console.error('Encountered a problem: ' + error));
  }, []);

  function onChangeValue1(event) {
    const result = event.target.value/currencyRates.current[currency1]*currencyRates.current[currency2];
    setPrice2(result.toFixed(3));
    setPrice1(event.target.value);
  }

  function onChangeCurrency1(cur) {
    setCurrency1(cur);
    console.log(currency1);
  }

  useEffect(() => {
    const result = price1/currencyRates.current[currency1]*currencyRates.current[currency2];
    setPrice2(result.toFixed(3));
  }, [currency1]);

  function onChangeValue2(event) {
    const result = event.target.value/currencyRates.current[currency2]*currencyRates.current[currency1];
    setPrice1(result.toFixed(3));
    setPrice2(event.target.value);
  }

  function onChangeCurrency2(cur) {
    setCurrency2(cur);
    console.log(currency2);
  }

  useEffect(() => {    
    const result = price2/currencyRates.current[currency2]*currencyRates.current[currency1];
    setPrice1(result.toFixed(3));
  }, [currency2]);

  return (
    <>
      <h1>Smart Currency Converter</h1>
      <div></div>
      <Block value={price1} currency={currency1} changeValue={onChangeValue1} changeCurrency={onChangeCurrency1}/>
      <Block value={price2} currency={currency2} changeValue={onChangeValue2} changeCurrency={onChangeCurrency2}/>
    </>
  )
}

export default App
