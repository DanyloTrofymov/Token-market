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
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      throw err;
    }
  } else {
    throw new Error('MetaMask not detected');
  }
};
