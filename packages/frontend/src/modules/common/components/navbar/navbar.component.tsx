import React, { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { BaseModal } from '../modal';

export const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Market
        </Typography>
      </Toolbar>
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Error">
        <p>{errorMessage}</p>
      </BaseModal>
    </AppBar>
  );
};
