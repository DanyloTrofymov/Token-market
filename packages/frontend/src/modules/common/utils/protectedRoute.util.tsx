import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMetaMask } from '../../hooks/useMetaMaskConnect';
import { ROUTER_KEYS } from '../consts/app-keys.const';

interface ProtectedRouteProps {
  children: ReactElement<any, any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { provider, isLoading, error } = useMetaMask();
  const history = useHistory();

  useEffect(() => {
    if (!provider && !isLoading) {
      history.push(ROUTER_KEYS.CONNECT_WALLET);
    }
  }, [provider, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!provider || error) {
    history.push(ROUTER_KEYS.CONNECT_WALLET);
  }

  return children;
};

export default ProtectedRoute;
