function CryptoCurrency({ icon, name, price, textColor }) {
  return (
    <div className={`crypto-container flex flex-grow items-center justify-between gap-3 text-3xl ${textColor}`}>
      <div>
        {icon} <p className="text-xs mt-1">{name}</p>
      </div>
      <span>${price || "N/A"}</span>
    </div>
  );
}

export default CryptoCurrency;
