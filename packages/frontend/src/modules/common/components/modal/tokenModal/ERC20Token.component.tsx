import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { useBuyERC20Mutation } from '../../../../hooks/useMarket';
import { MutationError } from '../../../types';
import { parseError } from '../../../utils/errorMessageParser';

interface ERC20ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const ERC20Modal: React.FC<ERC20ModalProps> = ({ isOpen, onClose, setErrorMessage }) => {
  if (!isOpen) {
    return null;
  }

  const [amount, setAmount] = useState<number | ''>('');
  const buyERC20Mutation = useBuyERC20Mutation();

  useEffect(() => {
    if (buyERC20Mutation.error) {
      const error = buyERC20Mutation.error as MutationError;
      setErrorMessage(parseError(error.message));
    }
  }, [buyERC20Mutation.error]);

  const handleBuyERC20Token = () => {
    if (typeof amount === 'number') {
      buyERC20Mutation.mutate(amount);
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
          onClick={handleBuyERC20Token}
          disabled={buyERC20Mutation.isLoading}
        >
          {buyERC20Mutation.isLoading ? <CircularProgress size={20} /> : 'Buy'}
        </Button>
      }
    >
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </BaseModal>
  );
};
