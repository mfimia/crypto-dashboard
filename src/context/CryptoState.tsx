import { useState } from "react";
import CryptoContext from "./CryptoContext";

export interface Coin {
  readonly price: number;
  tickers: any[];
}

const CryptoState: React.FC = (props): JSX.Element => {
  const [bitcoin, setBitcoin] = useState<Coin>({ price: 0, tickers: [] });
  const [ethereum, setEthereum] = useState<Coin>({ price: 0, tickers: [] });
  const [doge, setDoge] = useState<Coin>({ price: 0, tickers: [] });

  // GET Bitcoin data
  const getBitcoinData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    const data = await res.json();
    setBitcoin((prev) => {
      return {
        ...prev,
        price: data.market_data.current_price.eur,
        tickers: data.tickers,
      };
    });
  };

  // GET Ethereum data
  const getEthereumData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/ethereum");
    const data = await res.json();
    setEthereum((prev) => {
      return {
        ...prev,
        price: data.market_data.current_price.eur,
        tickers: data.tickers,
      };
    });
  };

  // GET DogeCoin data
  const getDogeData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    const data = await res.json();
    setDoge((prev) => {
      return {
        ...prev,
        price: data.market_data.current_price.eur,
        tickers: data.tickers,
      };
    });
  };

  const getCoinData = () => {
    getBitcoinData();
    getEthereumData();
    getDogeData();
  };

  return (
    <CryptoContext.Provider
      value={{
        bitcoin,
        ethereum,
        doge,
        getCoinData,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoState;
