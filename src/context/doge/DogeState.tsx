import { useState } from "react";
import DogeContext from "./DogeContext";
import Coin from "../CoinInterface";

const DogeState: React.FC = (props): JSX.Element => {
  const [doge, setDoge] = useState<Coin>({
    price: 0,
    tickers: [],
    market: {
      prices: [],
      market_caps: [],
      total_volumes: [],
    },
  });

  // GET Doge data
  const getDogeData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/dogecoin"
      );
      const data = await res.json();

      setDoge((prev) => {
        return {
          ...prev,
          price: data.market_data.current_price.eur,
          tickers: data.tickers,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  // GET Doge market data
  const getDogeMarketData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=eur&days=7"
      );
      const data = await res.json();
      const { prices, market_caps, total_volumes } = data;

      setDoge((prev) => {
        return {
          ...prev,
          market: {
            prices,
            market_caps,
            total_volumes,
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getDoge = () => {
    getDogeData();
    getDogeMarketData();
  };

  return (
    <DogeContext.Provider
      value={{
        doge,
        getDoge,
        setDoge,
      }}
    >
      {props.children}
    </DogeContext.Provider>
  );
};

export default DogeState;
