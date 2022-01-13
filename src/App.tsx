import CryptoList from "./components/crypto/CryptoList";
import BitcoinState from "./context/bitcoin/BitcoinState";
import EthereumState from "./context/ethereum/EthereumState";
import DogeState from "./context/doge/DogeState";
import UpfState from "./context/upfinity/UpfState";

const App: React.FC = (): JSX.Element => {
  return (
    <BitcoinState>
      <EthereumState>
        <DogeState>
          <UpfState>
            <CryptoList />
          </UpfState>
        </DogeState>
      </EthereumState>
    </BitcoinState>
  );
};

export default App;
