import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { connectToMetaMask, isMetaMaskConnected } from '../services/metamask.service';

export const useMetaMask = () => {
  const [provider, setProvider] = useState<Web3Provider>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  const connect = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const newProvider = await connectToMetaMask();
      setProvider(newProvider);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const hasAccount = await isMetaMaskConnected();
        if (!hasAccount) {
          setIsLoading(false);
          setProvider(undefined);
          return;
        }

        const newProvider = await detectEthereumProvider();
        if (newProvider) {
          setProvider(new Web3Provider(newProvider));
          setIsLoading(false);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    checkConnection();

    window.ethereum.on('accountsChanged', () => {
      checkConnection();
    });

    return () => {
      window.ethereum.removeListener('accountsChanged', () => checkConnection());
    };
  }, []);
  return { connect, isLoading, error, provider };
};
