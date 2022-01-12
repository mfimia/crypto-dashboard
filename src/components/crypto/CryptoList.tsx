import { useContext, useEffect } from "react";
import CryptoContext from "../../context/CryptoContext";

const CryptoList: React.FC = (): JSX.Element => {
  const cryptoContext = useContext(CryptoContext);

  const { bitcoin, ethereum, doge, getCoinData } = cryptoContext;

  useEffect(() => {
    getCoinData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {bitcoin.price}€, {ethereum.price}€, {doge.price}€
    </div>
  );
};

export default CryptoList;
