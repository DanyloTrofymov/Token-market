// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  METAMASK_PROVIDER: 'metaMaskProvider',
  MARKET_BALANCE: 'marketBalance',
  USER_ERC20_BALANCE: 'userERC20Balance',
  USER_ERC721_BALANCE: 'userERC721Balance',
  USER_ERC1155_BALANCE: 'userERC1155Balance',
  TOKENS: 'tokens'
};

// Backend Routes
export const BACKEND_KEYS = {
  MORALIS_GET_OWNERS: '/moralis/get_owners'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  CONNECT_WALLET: '/connect-wallet',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESTORE_PASSWORD: '/forgot-password/:token',
  CONFIRM_EMAIL: '/confirmation/:token'
};
