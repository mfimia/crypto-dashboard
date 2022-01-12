import { useEffect } from "react";
import CryptoList from "./components/crypto/CryptoList";
import CryptoState from "./context/CryptoState";

const App: React.FC = (): JSX.Element => {
  return (
    <CryptoState>
      <CryptoList />
    </CryptoState>
  );
};

export default App;
