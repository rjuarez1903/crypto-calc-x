import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import InputMoney from "./InputMoney";
import CurrencySelector from "./CurrencySelector";
import axios from "../axiosConfig";

function Calculator() {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cryptoData, setCryptoData] = useState({});
  const [calculatedBTC, setCalculatedBTC] = useState(null);
  const [calculatedETH, setCalculatedETH] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [displayInput, setDisplayInput] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "simple/price?ids=bitcoin,ethereum&vs_currencies=usd,ars"
      );
      setCryptoData(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCryptoValue = () => {
    if (userInput && cryptoData.bitcoin && cryptoData.ethereum) {
      // Parse userInput back to a float for calculation
      const floatInput = parseFloat(userInput.replace(/,/g, ""));

      const btcPrice =
        currency === "usd" ? cryptoData.bitcoin.usd : cryptoData.bitcoin.ars;
      const ethPrice =
        currency === "usd" ? cryptoData.ethereum.usd : cryptoData.ethereum.ars;

      // Set values with toLocaleString for display
      setCalculatedBTC(
        (floatInput / btcPrice).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      );
      setCalculatedETH(
        (floatInput / ethPrice).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      );

      // Store the userInput value before clearing it
      setDisplayInput(userInput);
      setUserInput(""); // Clear the input after calculating
    }
  };

  const handleReset = () => {
    setCalculatedBTC(null);
    setCalculatedETH(null);
    setUserInput("");
    setDisplayInput("");
  };

  useEffect(() => {
    if (displayInput && cryptoData.bitcoin && cryptoData.ethereum) {
      // Similar adjustments when the currency or data changes
      const floatInput = parseFloat(displayInput.replace(/,/g, ""));
      const btcPrice =
        currency === "usd" ? cryptoData.bitcoin.usd : cryptoData.bitcoin.ars;
      const ethPrice =
        currency === "usd" ? cryptoData.ethereum.usd : cryptoData.ethereum.ars;
      setCalculatedBTC(
        (floatInput / btcPrice).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      );
      setCalculatedETH(
        (floatInput / ethPrice).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      );
    } else {
      setCalculatedBTC(null);
      setCalculatedETH(null);
    }
  }, [currency, cryptoData, displayInput]);

  return (
    <div className="text-center text-white w-[900px] max-w-[900px]">
      <h2 className="text-4xl mb-4 font-bold">Current Rates in USD</h2>
      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <ThreeCircles
            height="100"
            width="100"
            color="#21C55D"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}{" "}
              {lastUpdated.toLocaleDateString()}
            </p>
            <button
              onClick={fetchData}
              className="flex items-center justify-center mx-auto w-auto mt-4 px-4 py-2 border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-zinc-900 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200"
            >
              <IoReload className="mr-1" /> Refresh
            </button>
          </div>
          <div className="md:flex md:flex-row md:gap-2 mb-4 justify-center">
            <div className="crypto-container flex items-center text-3xl text-yellow-500">
              <FaBitcoin />
              <span className="ml-2">
                ${cryptoData.bitcoin?.usd?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="crypto-container flex items-center text-3xl text-blue-400">
              <FaEthereum />
              <span className="ml-2">
                ${cryptoData.ethereum?.usd?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
          <div className="glass max-w-[600px] mx-auto">
            {!calculatedBTC && !calculatedETH && (
              <>
                <InputMoney value={userInput} setValue={setUserInput} />
                <button
                  onClick={calculateCryptoValue}
                  className="block w-full mt-4 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Convert
                </button>
              </>
            )}
            {(calculatedBTC || calculatedETH) && (
              <>
                {calculatedBTC && (
                  <div className="crypto-container text-2xl mt-4">
                    <span className="text-white">
                      ${displayInput} {currency.toUpperCase()} is worth {" "}
                    </span>
                    <span className="text-yellow-500">${calculatedBTC} BTC</span>
                  </div>
                )}
                {calculatedETH && (
                  <div className="crypto-container text-2xl mt-4">
                    <span className="text-white">
                      ${displayInput} {currency.toUpperCase()} is worth{" "}
                    </span>
                    <span className="text-blue-400">${calculatedETH} ETH</span>
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="block w-full mt-4 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
                >
                  New Calculation
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Calculator;
