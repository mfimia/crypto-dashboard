import { useContext, useEffect } from "react";
import EthereumContext from "../../context/ethereum/EthereumContext";
import { emptyCoin } from "../../utils/emptyCoin";
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory";

const EthereumChart: React.FC = (): JSX.Element => {
  const ethereumContext = useContext(EthereumContext);

  const { ethereum, getEthereum, setEthereum } = ethereumContext;

  useEffect(() => {
    getEthereum();
    const ethereumID = setInterval(() => {
      getEthereum();
    }, 10000);

    return () => {
      clearInterval(ethereumID);
      setEthereum(emptyCoin);
    };
    // eslint-disable-next-line
  }, []);

  const ethereumChart = ethereum.market.prices.map((entry: any[]) => {
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
            data: { stroke: "blue" },
          }}
          data={ethereumChart}
        />
      </VictoryChart>
    </div>
  );
};

export default EthereumChart;
