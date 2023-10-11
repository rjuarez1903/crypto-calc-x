// CurrencySelector.jsx
import React from "react";

function CurrencySelector({ currency, setCurrency }) {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => setCurrency("usd")}
        className={`glass-selector mx-2 py-2 px-4 focus:outline-none ${currency === 'usd' ? 'glass-active' : ''}`}
      >
        USD
      </button>
      <button
        onClick={() => setCurrency("ars")}
        className={`glass-selector mx-2 py-2 px-4 focus:outline-none ${currency === 'ars' ? 'glass-active' : ''}`}
      >
        ARS
      </button>
    </div>
  );
}

export default CurrencySelector;
