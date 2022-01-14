import BitcoinChart from "./BitcoinChart";
import EthereumChart from "./EthereumChart";
import DogeCoinChart from "./DogeCoinChart";
import UpfinityChart from "./UpfinityChart";

const CryptoList: React.FC = (): JSX.Element => {
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <BitcoinChart />
      <EthereumChart />
      <DogeCoinChart />
      <UpfinityChart />
    </div>
  );
};

export default CryptoList;
