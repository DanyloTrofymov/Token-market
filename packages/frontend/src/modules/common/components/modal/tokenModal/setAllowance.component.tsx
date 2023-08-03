import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { useSetAllowanceMutation } from '../../../../hooks/useMarket';
import { MutationError } from '../../../types';
import { parseError } from '../../../utils/errorMessageParser';

interface SetAllowanceProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const SetAllowanceModal: React.FC<SetAllowanceProps> = ({
  isOpen,
  onClose,
  setErrorMessage
}) => {
  if (!isOpen) {
    return null;
  }

  const [amount, setAmount] = useState<number | ''>('');
  const setAllowanceMutation = useSetAllowanceMutation();

  useEffect(() => {
    if (setAllowanceMutation.error) {
      const error = setAllowanceMutation.error as MutationError;
      setErrorMessage(parseError(error.message));
    }
  }, [setAllowanceMutation.error]);

  const handleSetAllowance = () => {
    if (typeof amount === 'number') {
      setAllowanceMutation.mutate(amount);
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
          onClick={handleSetAllowance}
          disabled={setAllowanceMutation.isLoading}
        >
          {setAllowanceMutation.isLoading ? <CircularProgress size={20} /> : 'Set Allowance'}
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
