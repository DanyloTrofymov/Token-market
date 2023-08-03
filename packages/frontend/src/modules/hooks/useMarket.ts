import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MarketService } from '../services/market.service';
import { ERC20TokenService } from '../services/erc20.service';
import { QUERY_KEYS } from '../common/consts/app-keys.const';
import { Create1155 } from '../common/types';
import { MoralisService } from '../services/http/moralis.service';

export function useBuyERC20Mutation() {
  const queryClient = useQueryClient();

  return useMutation((amount: number) => MarketService.buyERC20token(amount), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MARKET_BALANCE, QUERY_KEYS.USER_ERC20_BALANCE]);
    }
  });
}

export function useCreateERC721Mutation() {
  const queryClient = useQueryClient();

  return useMutation((tokenURI: string) => MarketService.createERC721token(tokenURI), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        QUERY_KEYS.USER_ERC20_BALANCE,
        QUERY_KEYS.USER_ERC721_BALANCE
      ]);
    }
  });
}

export function useCreateERC1155Mutation() {
  const queryClient = useQueryClient();

  return useMutation((data: Create1155) => MarketService.createERC1155token(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        QUERY_KEYS.USER_ERC20_BALANCE,
        QUERY_KEYS.USER_ERC1155_BALANCE
      ]);
    }
  });
}

export function useGetERC20BalanceQuery() {
  return useQuery(QUERY_KEYS.USER_ERC20_BALANCE, () => MarketService.getERC20balance());
}

export function useGetERC721BalanceQuery() {
  return useQuery(QUERY_KEYS.USER_ERC721_BALANCE, () => MarketService.getERC721balance());
}

export function useGetERC1155BalanceQuery() {
  return useQuery(QUERY_KEYS.USER_ERC1155_BALANCE, () => MarketService.getERC1155balance());
}

export function useGetMarketBalanceQuery() {
  return useQuery(QUERY_KEYS.MARKET_BALANCE, () => MarketService.getMarketBalance());
}

export function useSetAllowanceMutation() {
  const queryClient = useQueryClient();

  return useMutation((amount: number) => ERC20TokenService.setAllowance(amount), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER_ERC20_BALANCE]);
    }
  });
}

export function useGetOwnersQuery() {
  return useQuery(QUERY_KEYS.TOKENS, () => MoralisService.getOwners());
}
