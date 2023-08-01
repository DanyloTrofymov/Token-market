import { ethers } from 'ethers';

export const connectToMetaMask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      window.ethereum.on('accountsChanged', () => {
        connectToMetaMask();
      });

      return provider;
    } catch (err: any) {
      if (err.code === -32002) {
        throw new Error('Check your MetaMask extension');
      }
    }
  }
  throw new Error('MetaMask not detected');
};

export const isMetaMaskConnected = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts.length > 0;
    } catch (err) {
      return false;
    }
  }

  throw new Error('MetaMask not detected');
};
