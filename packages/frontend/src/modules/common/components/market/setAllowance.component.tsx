import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useSetAllowanceMutation } from '../../../hooks/useMarket';
import { BaseModal } from '../modal';
import { MutationError } from '../../types';
import { parseError } from '../../utils/errorMessageParser';

const SetAllowance: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const setAllowanceMutation = useSetAllowanceMutation();
  const [errorMessage, setErrorMessage] = useState('');

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
    <>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button
        variant="contained"
        onClick={handleSetAllowance}
        disabled={setAllowanceMutation.isLoading}
      >
        {setAllowanceMutation.isLoading ? <CircularProgress size={20} /> : 'Set Allowance'}
      </Button>
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Info">
        <p>{errorMessage}</p>
      </BaseModal>
    </>
  );
};

export default SetAllowance;
