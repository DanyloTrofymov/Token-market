import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useBuyERC20Mutation } from '../../../hooks/useMarket';
import { BaseModal } from '../modal';
import { MutationError } from '../../types';
import { parseError } from '../../utils/errorMessageParser';

const ERC20Token: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const buyERC20Mutation = useBuyERC20Mutation();
  const [errorMessage, setErrorMessage] = useState('');

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
    <>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button
        variant="contained"
        onClick={handleBuyERC20Token}
        disabled={buyERC20Mutation.isLoading}
      >
        {buyERC20Mutation.isLoading ? <CircularProgress size={20} /> : 'Buy'}
      </Button>
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Info">
        <p>{errorMessage}</p>
      </BaseModal>
    </>
  );
};

export default ERC20Token;
