import Coin from "../context/CoinInterface";

export const emptyCoin: Coin = {
  price: 0,
  tickers: [],
  market: {
    prices: [],
    market_caps: [],
    total_volumes: [],
  },
};
