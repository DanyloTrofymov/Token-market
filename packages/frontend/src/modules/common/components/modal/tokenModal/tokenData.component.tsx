import React from 'react';
import { Typography } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { useGetOwnersQuery } from '../../../../hooks/useMarket';

interface TokenDataProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TokenDataModal: React.FC<TokenDataProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const ownersData = useGetOwnersQuery();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Token data">
      <Typography gutterBottom>{ownersData}</Typography>
    </BaseModal>
  );
};
