import React from 'react';
import { Box, Typography } from '@mui/material';
import ERC20Token from '../../components/market/ERC20Token.component';
import ERC721Token from '../../components/market/ERC721Token.component';
import ERC1155Token from '../../components/market/ERC1155Token.component';
import SetAllowance from '../../components/market/setAllowance.component';
import {
  useGetERC20BalanceQuery,
  useGetERC721BalanceQuery,
  useGetERC1155BalanceQuery,
  useGetMarketBalanceQuery
} from '../../../hooks/useMarket';

const Market: React.FC = () => {
  const getERC20BalanceQuery = useGetERC20BalanceQuery();
  const getERC721BalanceQuery = useGetERC721BalanceQuery();
  const getERC1155BalanceQuery = useGetERC1155BalanceQuery();
  const getMarketBalanceQuery = useGetMarketBalanceQuery();

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Buy ERC20 Token
      </Typography>
      <ERC20Token />

      <Typography variant="h5" gutterBottom>
        Create ERC721 Token
      </Typography>
      <ERC721Token />

      <Typography variant="h5" gutterBottom>
        Create ERC1155 Token
      </Typography>
      <ERC1155Token />

      <Typography variant="h5" gutterBottom>
        Set ERC20 Allowance
      </Typography>
      <SetAllowance />

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
