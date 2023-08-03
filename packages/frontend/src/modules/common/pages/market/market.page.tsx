import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  useGetERC20BalanceQuery,
  useGetERC721BalanceQuery,
  useGetERC1155BalanceQuery,
  useGetMarketBalanceQuery
} from '../../../hooks/useMarket';
import { ActionButtons } from '../../components/market/actionButtons/actionButtons.component';

const Market: React.FC = () => {
  const getERC20BalanceQuery = useGetERC20BalanceQuery();
  const getERC721BalanceQuery = useGetERC721BalanceQuery();
  const getERC1155BalanceQuery = useGetERC1155BalanceQuery();
  const getMarketBalanceQuery = useGetMarketBalanceQuery();

  return (
    <Box p={4}>
      <ActionButtons />
      <Typography variant="h5" gutterBottom>
        ERC20 Balance: {getERC20BalanceQuery.data && getERC20BalanceQuery.data.toString()}
      </Typography>
      <Typography variant="h5" gutterBottom>
        ERC721 Balance: {getERC721BalanceQuery.data && getERC721BalanceQuery.data.length}
      </Typography>
      <Typography variant="h5" gutterBottom>
        ERC1155 Balance: {getERC1155BalanceQuery.data && getERC1155BalanceQuery.data.toString()}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Market Balance: {getMarketBalanceQuery.data && getMarketBalanceQuery.data.toString()} ERC20
      </Typography>
    </Box>
  );
};

export default Market;
