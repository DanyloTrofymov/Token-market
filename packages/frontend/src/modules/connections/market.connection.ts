import { ethers } from 'ethers';
import MarketContract from '../../ABI/market/Market.json';

export const MarketConnection = async () => {
  let market;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (provider) {
    market = new ethers.Contract(
      process.env.REACT_APP_MARKET_ADDRESS || '',
      MarketContract.abi,
      provider.getSigner(0)
    );
  }
  return market;
};
