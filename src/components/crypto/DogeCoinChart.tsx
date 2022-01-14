import { useContext, useEffect } from "react";
import DogeContext from "../../context/doge/DogeContext";
import { emptyCoin } from "../../utils/emptyCoin";
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory";

const DogeCoinChart: React.FC = (): JSX.Element => {
  const dogeContext = useContext(DogeContext);

  const { doge, getDoge, setDoge } = dogeContext;

  useEffect(() => {
    getDoge();
    const dogeID = setInterval(() => {
      getDoge();
    }, 10000);

    return () => {
      clearInterval(dogeID);
      setDoge(emptyCoin);
    };
    // eslint-disable-next-line
  }, []);

  const dogeChart = doge.market.prices.map((entry: any[]) => {
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
            data: { stroke: "brown" },
          }}
          data={dogeChart}
        />
      </VictoryChart>
    </div>
  );
};

export default DogeCoinChart;
