import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import Loader from '../../utils/loader.styled';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { useMetaMask } from '../../../hooks/useMetaMaskConnect';
import { BaseModal } from '../../components/modal';

export const ConnectMetaMask: React.FC = () => {
  const history = useHistory();
  const { connect, provider, isLoading, error } = useMetaMask();
  const [errorMessage, setErrorMessage] = useState('');

  const checkConnection = async () => {
    await connect();
    if (provider) {
      history.push(ROUTER_KEYS.ROOT);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
    if (provider) {
      checkConnection();
    }
  }, [error, provider]);

  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            <Typography variant="h4">Connect MetaMask</Typography>
            <Typography variant="body1">
              To use this app, you need to connect your MetaMask account.
            </Typography>
            <Typography variant="body1">
              If you don&apos;t have MetaMask, you can install it{' '}
              <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">
                here
              </a>
              .
            </Typography>
            <Box mt={2}>
              <Button variant="contained" onClick={() => checkConnection()}>
                Connect
              </Button>
            </Box>
          </Box>
        )}
        <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Info">
          <p>{errorMessage}</p>
        </BaseModal>
      </StyledFormBox>
    </StyledAuthPageBox>
  );
};
