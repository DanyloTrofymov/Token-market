import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import Loader from '../../utils/loader.styled';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import useMetaMaskConnect from '../../../hooks/useMetaMaskConnect';

export const ConnectMetaMask: React.FC = () => {
  const history = useHistory();
  const { connect, isLoading, error } = useMetaMaskConnect();

  const handleConnect = async () => {
    try {
      await connect();
      history.push(ROUTER_KEYS.ROOT);
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
    }
  };

  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Typography>Error: {error}</Typography>
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
              <Button onClick={handleConnect}>Connect</Button>
            </Box>
          </Box>
        )}
      </StyledFormBox>
    </StyledAuthPageBox>
  );
};
