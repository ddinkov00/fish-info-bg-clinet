export const EMPTY_STRING = '';

export const LocalStorageKeys = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export const Routes = {
  login: '/login',
  register: '/register',
  home: '/home',
  prohibitions: '/prohibitions',
} as const;

export type RouteKeys = keyof typeof Routes;
export type RouteValues = (typeof Routes)[RouteKeys];
