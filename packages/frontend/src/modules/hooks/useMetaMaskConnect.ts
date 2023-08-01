import { useMutation } from 'react-query';
import { connectToMetaMask } from '../services/metamask.service';

const useMetaMaskConnect = () => {
  const connectMutation = useMutation(connectToMetaMask);

  const connect = async () => {
    try {
      const provider = await connectMutation.mutateAsync();
      return provider;
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      throw err;
    }
  };

  return {
    connect,
    isLoading: connectMutation.isLoading,
    error: connectMutation.error
  };
};

export default useMetaMaskConnect;
