import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { useCreateERC1155Mutation } from '../../../../hooks/useMarket';
import { MutationError } from '../../../types';
import { parseError } from '../../../utils/errorMessageParser';

interface ERC1155ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const ERC1155Modal: React.FC<ERC1155ModalProps> = ({ isOpen, onClose, setErrorMessage }) => {
  if (!isOpen) {
    return null;
  }
  const [amount, setAmount] = useState<number | ''>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const createERC1155Mutation = useCreateERC1155Mutation();

  useEffect(() => {
    if (createERC1155Mutation.error) {
      const error = createERC1155Mutation.error as MutationError;
      setErrorMessage(parseError(error.message));
    }
  }, [createERC1155Mutation.error]);

  const handleCreateERC1155Token = () => {
    if (typeof amount === 'number') {
      createERC1155Mutation.mutate({ tokenURI, amount });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Buy ERC20 Token"
      buttons={
        <Button
          variant="contained"
          onClick={handleCreateERC1155Token}
          disabled={createERC1155Mutation.isLoading}
        >
          {createERC1155Mutation.isLoading ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      }
    >
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <TextField label="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
    </BaseModal>
  );
};
