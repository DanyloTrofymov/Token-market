import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  BaseModal,
  ERC1155Modal,
  ERC20Modal,
  ERC721Modal,
  SetAllowanceModal,
  TokenDataModal
} from '../../modal';

export const ActionButtons = () => {
  const [isERC20Open, setIsERC20Open] = useState(false);
  const [isERC721Open, setIsERC721Open] = useState(false);
  const [isERC1155Open, setIsERC1155Open] = useState(false);
  const [isSetAllowanceOpen, setIsSetAllowanceOpen] = useState(false);
  const [isTokenDataOpen, setIsTokenDataOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <Box sx={{ mr: 'auto' }}>
      <Button
        variant="contained"
        color="info"
        onClick={() => setIsERC20Open(true)}
        sx={{ mr: '1rem', mb: '1rem' }}
      >
        Buy ERC20
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => setIsERC721Open(true)}
        sx={{ mr: '1rem', mb: '1rem' }}
      >
        Create ERC721
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => setIsERC1155Open(true)}
        sx={{ mr: '1rem', mb: '1rem' }}
      >
        Create ERC1155
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => setIsSetAllowanceOpen(true)}
        sx={{ mr: '1rem', mb: '1rem' }}
      >
        Set Allowance
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => setIsTokenDataOpen(true)}
        sx={{ mr: '1rem', mb: '1rem' }}
      >
        Get data
      </Button>
      <ERC20Modal
        isOpen={isERC20Open}
        onClose={() => setIsERC20Open(false)}
        setErrorMessage={setErrorMessage}
      />
      <ERC721Modal
        isOpen={isERC721Open}
        onClose={() => setIsERC721Open(false)}
        setErrorMessage={setErrorMessage}
      />
      <ERC1155Modal
        isOpen={isERC1155Open}
        onClose={() => setIsERC1155Open(false)}
        setErrorMessage={setErrorMessage}
      />
      <SetAllowanceModal
        isOpen={isTokenDataOpen}
        onClose={() => setIsTokenDataOpen(false)}
        setErrorMessage={setErrorMessage}
      />
      <TokenDataModal isOpen={isSetAllowanceOpen} onClose={() => setIsSetAllowanceOpen(false)} />
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Error">
        <p>{errorMessage}</p>
      </BaseModal>
    </Box>
  );
};
