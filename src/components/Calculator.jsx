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
      if (!navigator.onLine) {
        const cachedData = await getCachedData(
          "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,ars"
        );
        if (cachedData) {
          setCryptoData(cachedData.data);
          setLastUpdated(new Date(cachedData.lastUpdated));
          handleReset();
          setCurrency("usd");
          return;
        } else {
          console.error("You're offline and the data isn't cached.");
          return;
        }
      }

      const response = await axios.get(
        "simple/price?ids=bitcoin,ethereum&vs_currencies=usd,ars"
      );
      setCryptoData(response.data);
      const now = new Date();
      setLastUpdated(now);
      handleReset();
      setCurrency("usd");

      if ("caches" in window) {
        const cache = await caches.open("crypto-rate-cache");
        await cache.put(
          "/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,ars",
          new Response(
            JSON.stringify({
              data: response.data,
              lastUpdated: now,
            })
          )
        );
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getCachedData = async (url) => {
    if ("caches" in window) {
      const cache = await caches.open("crypto-rate-cache");
      const cachedResponse = await cache.match(url);
      if (cachedResponse && cachedResponse.ok) {
        return cachedResponse.json();
      }
    }
    return null;
  };

  const calculateCryptoValue = () => {
    if (userInput && cryptoData.bitcoin && cryptoData.ethereum) {
      const floatInput = parseFloat(userInput.replace(/,/g, ""));
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
      setDisplayInput(userInput);
      setUserInput("");
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
          <h2 className="text-4xl mb-4 font-bold">Current Rates in USD</h2>
          <div className="flex flex-col justify-center items-center gap-3 mb-4">
            <div className="flex justify-center items-center gap-3">
              <p className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}{" "}
                {lastUpdated.toLocaleDateString()}
              </p>
              {navigator.onLine && (
                <button onClick={fetchData}>
                  <IoReload className="mr-1" />
                </button>
              )}
            </div>
            {!navigator.onLine && (
              <p className="text-sm text-red-400">
                You're offline. Some features may not be available.
              </p>
            )}
          </div>

          <div className="md:flex md:flex-row md:gap-2 mb-4 justify-center md:w-[600px] md:mx-auto">
            <div className="crypto-container flex flex-grow items-center justify-between gap-3 text-3xl text-yellow-500">
              <div>
                <FaBitcoin /> <p className="text-xs mt-1">BTC</p>
              </div>
              <span>${cryptoData.bitcoin?.usd?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="crypto-container flex flex-grow items-center justify-between gap-3 text-3xl text-blue-400">
              <div>
                <FaEthereum /> <p className="text-xs mt-1">ETH</p>
              </div>
              <span>
                ${cryptoData.ethereum?.usd?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>

          <div className="glass max-w-[600px] mx-auto">
            {!calculatedBTC && !calculatedETH && (
              <>
                <h2 className="text-4xl mb-4 font-bold">
                  Calculate Crypto Value
                </h2>
                <CurrencySelector
                  currency={currency}
                  setCurrency={setCurrency}
                />
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
                      ${displayInput} {currency.toUpperCase()} is worth{" "}
                    </span>
                    <span className="text-yellow-500">
                      ${calculatedBTC} BTC
                    </span>
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
