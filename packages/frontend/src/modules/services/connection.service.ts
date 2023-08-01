import { ContractInterface, ethers } from 'ethers';

export const Connection = (ContractAddress: string, ContractAbi: ContractInterface) => {
  let market;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (provider) {
    market = new ethers.Contract(ContractAddress, ContractAbi, provider.getSigner(0));
  }
  if (market === undefined) {
    throw new Error('Market not detected');
  }
  return market;
};
