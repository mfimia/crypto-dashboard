import { useState } from "react";
import BitcoinContext from "./BitcoinContext";
import Coin from "../CoinInterface";

const BitcoinState: React.FC = (props): JSX.Element => {
  const [bitcoin, setBitcoin] = useState<Coin>({
    price: 0,
    tickers: [],
    market: {
      prices: [],
      market_caps: [],
      total_volumes: [],
    },
  });

  // GET Bitcoin data
  const getBitcoinData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      const data: any = await res.json();

      setBitcoin((prev) => {
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

  // GET Bitcoin market data
  const getBitcoinMarketData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=7"
      );
      const data: any = await res.json();
      const { prices, market_caps, total_volumes } = data;

      setBitcoin((prev) => {
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

  const getBitcoin = (): void => {
    getBitcoinData();
    getBitcoinMarketData();
  };

  return (
    <BitcoinContext.Provider
      value={{
        bitcoin,
        getBitcoin,
        setBitcoin,
      }}
    >
      {props.children}
    </BitcoinContext.Provider>
  );
};

export default BitcoinState;
