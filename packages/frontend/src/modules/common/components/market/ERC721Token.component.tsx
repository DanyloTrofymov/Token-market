import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useCreateERC721Mutation } from '../../../hooks/useMarket';
import { MutationError } from '../../types';
import { parseError } from '../../utils/errorMessageParser';
import { BaseModal } from '../modal';

const ERC721Token: React.FC = () => {
  const [tokenURI, setTokenURI] = useState<string>('');
  const createERC721Mutation = useCreateERC721Mutation();
  const [errorMessage, setErrorMessage] = useState('');

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
    <>
      <TextField label="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
      <Button
        variant="contained"
        onClick={handleCreateERC721Token}
        disabled={createERC721Mutation.isLoading}
      >
        {createERC721Mutation.isLoading ? <CircularProgress size={20} /> : 'Create'}
      </Button>
      <BaseModal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')} title="Info">
        <p>{errorMessage}</p>
      </BaseModal>
    </>
  );
};

export default ERC721Token;
