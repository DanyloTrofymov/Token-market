import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useCreateERC1155Mutation } from '../../../hooks/useMarket';
import { BaseModal } from '../modal';
import { parseError } from '../../utils/errorMessageParser';
import { MutationError } from '../../types';

const ERC1155Token: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const createERC1155Mutation = useCreateERC1155Mutation();
  const [errorMessage, setErrorMessage] = useState('');

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
    <>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <TextField label="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
      <Button
        variant="contained"
        onClick={handleCreateERC1155Token}
        disabled={createERC1155Mutation.isLoading}
      >
        {createERC1155Mutation.isLoading ? <CircularProgress size={20} /> : 'Create'}
      </Button>
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Info">
        <p>{errorMessage}</p>
      </BaseModal>
    </>
  );
};

export default ERC1155Token;
