// CurrencySelector.jsx
import React from "react";

function CurrencySelector({ currency, setCurrency }) {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => setCurrency("usd")}
        className={`transition duration-300 ease-in-out mx-2 py-2 px-4 focus:outline-none rounded ${currency === 'usd' ? 'bg-gray-200 text-gray-800' : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-800'}`}
      >
        USD
      </button>
      <button
        onClick={() => setCurrency("ars")}
        className={`transition duration-300 ease-in-out mx-2 py-2 px-4 focus:outline-none rounded ${currency === 'ars' ? 'bg-gray-200 text-gray-800' : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-800'}`}
      >
        ARS
      </button>
    </div>
  );
}

export default CurrencySelector;
