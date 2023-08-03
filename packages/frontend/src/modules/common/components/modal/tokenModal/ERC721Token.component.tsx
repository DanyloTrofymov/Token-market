import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { useCreateERC721Mutation } from '../../../../hooks/useMarket';
import { MutationError } from '../../../types';
import { parseError } from '../../../utils/errorMessageParser';

interface ERC721ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const ERC721Modal: React.FC<ERC721ModalProps> = ({ isOpen, onClose, setErrorMessage }) => {
  if (!isOpen) {
    return null;
  }

  const [tokenURI, setTokenURI] = useState<string>('');
  const createERC721Mutation = useCreateERC721Mutation();

  useEffect(() => {
    if (createERC721Mutation.error) {
      const error = createERC721Mutation.error as MutationError;
      setErrorMessage(parseError(error.message));
    }
  }, [createERC721Mutation.error]);

  const handleCreateERC721Token = () => {
    createERC721Mutation.mutate(tokenURI);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mint ERC721 Token"
      buttons={
        <Button
          variant="contained"
          onClick={handleCreateERC721Token}
          disabled={createERC721Mutation.isLoading}
        >
          {createERC721Mutation.isLoading ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      }
    >
      <TextField label="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
    </BaseModal>
  );
};
