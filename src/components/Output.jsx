function Output({
  input,
  currency,
  calculatedCurrency,
  calculatedCurrencyString,
  textColor,
}) {
  return (
    <div className="crypto-container text-2xl mt-4">
      <span className="text-white">
        ${input} {currency.toUpperCase()} is worth{" "}
      </span>
      <span className={textColor}>
        ${`${calculatedCurrency} ${calculatedCurrencyString}`}
      </span>
    </div>
  );
}

export default Output;
