import { useContext, useEffect } from "react";
import UpfContext from "../../context/upfinity/UpfContext";
import { emptyCoin } from "../../utils/emptyCoin";
import { VictoryChart, VictoryLine, VictoryZoomContainer } from "victory";

const UpfinityChart: React.FC = (): JSX.Element => {
  const upfContext = useContext(UpfContext);

  const { upf, getUpf, setUpf } = upfContext;

  useEffect(() => {
    getUpf();
    const upfID = setInterval(() => {
      getUpf();
    }, 10000);

    return () => {
      clearInterval(upfID);
      setUpf(emptyCoin);
    };
    // eslint-disable-next-line
  }, []);

  const upfChart = upf.market.prices.map((entry: any[]) => {
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
        padding={{
          left: 90,
          top: 60,
          bottom: 60,
          right: 60,
        }}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryLine
          style={{
            data: { stroke: "green" },
          }}
          data={upfChart}
        />
      </VictoryChart>
    </div>
  );
};

export default UpfinityChart;
