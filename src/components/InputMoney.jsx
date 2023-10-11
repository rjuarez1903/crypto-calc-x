import React from "react";

function InputMoney({ value, setValue }) {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, ""); // Limpiar la entrada de caracteres no numéricos
    if (inputValue === "") {
      setValue("");
      return;
    }
    const valueInCents = parseInt(inputValue, 10); // Convertir la entrada a un entero
    if (!isNaN(valueInCents)) {
      const valueInDollars = valueInCents * 0.01; // Convertir a dólares
      const formattedValue = valueInDollars.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); // Formatear como una cadena con comas
      setValue(formattedValue); // Setear el valor formateado
    }
  };

  return (
    <div className="bg-zinc-600 rounded-md p-2 flex">
      <span className="self-center text-white text-lg sm:text-2xl ps-2">$</span>
      <input
        type="text"
        value={value === "" ? "" : value} // Usar el valor formateado
        onChange={handleInputChange}
        className="flex-grow text-white bg-transparent text-lg sm:text-2xl p-2 outline-none focus:ring-0 truncate"
        placeholder={`Enter amount`}
      />
    </div>
  );
}

export default InputMoney;
