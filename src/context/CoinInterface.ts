export default interface Coin {
  readonly price: number;
  tickers: any[];
  market: {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
  };
}
