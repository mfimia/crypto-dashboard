import { useState } from "react";
import EthereumContext from "./EthereumContext";
import Coin from "../CoinInterface";

const EthereumState: React.FC = (props): JSX.Element => {
  const [ethereum, setEthereum] = useState<Coin>({
    price: 0,
    tickers: [],
    market: {
      prices: [],
      market_caps: [],
      total_volumes: [],
    },
  });

  // GET Ethereum data
  const getEthereumData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      const data: any = await res.json();

      setEthereum((prev) => {
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

  // GET Ethereum market data
  const getEthereumMarketData = async (): Promise<void> => {
    try {
      const res: Response = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=7"
      );
      const data: any = await res.json();
      const { prices, market_caps, total_volumes } = data;

      setEthereum((prev) => {
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

  const getEthereum = (): void => {
    getEthereumData();
    getEthereumMarketData();
  };

  return (
    <EthereumContext.Provider
      value={{
        ethereum,
        getEthereum,
        setEthereum,
      }}
    >
      {props.children}
    </EthereumContext.Provider>
  );
};

export default EthereumState;
