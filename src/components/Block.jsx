import React from 'react';
import './Block.css';

const currencies = ["USD", "EUR", "GBP"];

function Block({ value, currency, changeValue, changeCurrency }) {
    return (
        <div>
            <ul className="currency-list">
                {currencies.map((item, index) => <li key={index} className={currency === item ? 'active' : ''} onClick={() => changeCurrency(item)}>{item}</li>)}
            </ul>
            <input type="number" value={value} onChange={changeValue}/>
        </div>
    )
}

export default Block;