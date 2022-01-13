import { useContext, useEffect } from "react";
import BitcoinContext from "../../context/bitcoin/BitcoinContext";
import EthereumContext from "../../context/ethereum/EthereumContext";
import DogeContext from "../../context/doge/DogeContext";
import UpfContext from "../../context/upfinity/UpfContext";
import { emptyCoin } from "../../utils/emptyCoin";
import { VictoryChart, VictoryLine } from "victory";

const CryptoList: React.FC = (): JSX.Element => {
  const bitcoinContext = useContext(BitcoinContext);
  const ethereumContext = useContext(EthereumContext);
  const dogeContext = useContext(DogeContext);
  const upfContext = useContext(UpfContext);

  const { bitcoin, getBitcoin, setBitcoin } = bitcoinContext;
  const { ethereum, getEthereum, setEthereum } = ethereumContext;
  const { doge, getDoge, setDoge } = dogeContext;
  const { upf, getUpf, setUpf } = upfContext;

  useEffect(() => {
    getBitcoin();
    getEthereum();
    getDoge();
    getUpf();

    return () => {
      setBitcoin(emptyCoin);
      setEthereum(emptyCoin);
      setDoge(emptyCoin);
      setUpf(emptyCoin);
    };
    // eslint-disable-next-line
  }, []);

  const bitcoinChart = bitcoin.market.prices.map((entry: any[]) => {
    return {
      x: new Date(entry[0]),
      y: entry[1],
    };
  });
  const ethereumChart = ethereum.market.prices.map((entry: any[]) => {
    return {
      x: new Date(entry[0]),
      y: entry[1],
    };
  });
  const dogeChart = doge.market.prices.map((entry: any[]) => {
    return {
      x: new Date(entry[0]),
      y: entry[1],
    };
  });
  const upfChart = upf.market.prices.map((entry: any[]) => {
    return {
      x: new Date(entry[0]),
      y: entry[1],
    };
  });

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div
        style={{
          width: "45%",
          margin: "20px",
          display: "inline-block",
        }}
      >
        <VictoryChart width={600} padding={60}>
          <VictoryLine
            style={{
              data: { stroke: "gold" },
            }}
            data={bitcoinChart}
          />
        </VictoryChart>
      </div>
      <div
        style={{
          width: "45%",
          margin: "20px",
          display: "inline-block",
        }}
      >
        <VictoryChart width={600} padding={60}>
          <VictoryLine
            style={{
              data: { stroke: "blue" },
            }}
            data={ethereumChart}
          />
        </VictoryChart>
      </div>
      <div
        style={{
          width: "45%",
          margin: "20px",
          display: "inline-block",
        }}
      >
        <VictoryChart width={600} padding={60}>
          <VictoryLine
            style={{
              data: { stroke: "#943131" },
            }}
            data={dogeChart}
          />
        </VictoryChart>
      </div>
      <div
        style={{
          width: "45%",
          margin: "20px",
          display: "inline-block",
        }}
      >
        <VictoryChart width={600} padding={60}>
          <VictoryLine
            style={{
              data: { stroke: "green" },
            }}
            data={upfChart}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default CryptoList;
