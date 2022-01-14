import { useState } from "react";
import UpfContext from "./UpfContext";
import Coin from "../CoinInterface";

const UpfState: React.FC = (props): JSX.Element => {
  const [upf, setUpf] = useState<Coin>({
    price: 0,
    tickers: [],
    market: {
      prices: [],
      market_caps: [],
      total_volumes: [],
    },
  });

  // GET Upf data
  const getUpfData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/upfinity"
      );
      const data: any = await res.json();

      setUpf((prev) => {
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

  // GET Upf market data
  const getUpfMarketData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/upfinity/market_chart?vs_currency=eur&days=7"
      );
      const data: any = await res.json();
      const { prices, market_caps, total_volumes } = data;

      setUpf((prev) => {
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

  const getUpf = () => {
    getUpfData();
    getUpfMarketData();
  };

  return (
    <UpfContext.Provider
      value={{
        upf,
        getUpf,
        setUpf,
      }}
    >
      {props.children}
    </UpfContext.Provider>
  );
};

export default UpfState;
