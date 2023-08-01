import React from 'react';
import { Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { StyledBox } from '../../../home/home.styled';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export const NotFoundPage: React.FC = () => {
  const history = useHistory();
  const handleGoHome = () => {
    history.push(ROUTER_KEYS.ROOT);
  };

  return (
    <StyledBox>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleGoHome()}>
        Go to Home
      </Button>
    </StyledBox>
  );
};
