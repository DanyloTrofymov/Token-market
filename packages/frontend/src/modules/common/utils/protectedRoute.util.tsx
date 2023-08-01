import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMetaMaskConnect from '../../hooks/useMetaMaskConnect';
import { ROUTER_KEYS } from '../consts/app-keys.const';

interface ProtectedRouteProps {
  children: ReactElement<any, any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { connect, isLoading, error } = useMetaMaskConnect();
  const history = useHistory();

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await connect();
      if (!isConnected && !isLoading && !error) {
        history.push(ROUTER_KEYS.CONNECT_WALLET);
      }
    };
    checkConnection();
  }, [connect, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return children;
};

export default ProtectedRoute;
