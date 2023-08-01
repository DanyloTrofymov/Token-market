// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS: 'todos',
  USER: 'user'
};

// Backend Routes
export const BACKEND_KEYS = {
  TODOS: 'todos',
  TODOS_COUNT: 'todos/count',
  LOGIN: 'user/login',
  SIGNUP: 'user/signup',
  FORGOT_PASSWORD: 'user/forgot-password',
  CONFIRM_EMAIL: 'user/confirm',
  CHANGE_PASSWORD: 'user/change-password',
  USER: 'user'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  CONNECT_WALLET: '/connect-wallet',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESTORE_PASSWORD: '/forgot-password/:token',
  CONFIRM_EMAIL: '/confirmation/:token'
};
