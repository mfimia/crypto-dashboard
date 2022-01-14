import { useContext, useEffect } from "react";
import BitcoinContext from "../../context/bitcoin/BitcoinContext";
import { emptyCoin } from "../../utils/emptyCoin";
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory";

const BitcoinChart: React.FC = (): JSX.Element => {
  const bitcoinContext = useContext(BitcoinContext);

  const { bitcoin, getBitcoin, setBitcoin } = bitcoinContext;

  useEffect(() => {
    getBitcoin();
    const bitcoinID = setInterval(() => {
      getBitcoin();
    }, 10000);

    return () => {
      clearInterval(bitcoinID);
      setBitcoin(emptyCoin);
    };
    // eslint-disable-next-line
  }, []);

  const bitcoinChart = bitcoin.market.prices.map((entry: any[]) => {
    return {
      x: new Date(entry[0]),
      y: entry[1],
    };
  });

  return (
    <div
      style={{
        width: "45%",
        margin: "20px",
        display: "inline-block",
      }}
    >
      <VictoryChart
        width={600}
        padding={60}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryLine
          style={{
            data: { stroke: "gold" },
          }}
          data={bitcoinChart}
          interpolation="natural"
        />
      </VictoryChart>
    </div>
  );
};

export default BitcoinChart;
