const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const EXPIRE_REFRESH_TOKEN_KEY = "refresh_token_expires_at";
const EXPIRE_ACCESS_TOKEN_KEY = "access_token_expires_at";

export const authStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getExpireRefreshToken() {
    return localStorage.getItem(EXPIRE_REFRESH_TOKEN_KEY);
  },

  getExpireAccessToken() {
    return localStorage.getItem(EXPIRE_ACCESS_TOKEN_KEY);
  },

  setTokens(
    accessToken: string,
    refreshToken: string,
    expireRefreshToken: string,
    expireAccessToken: string,
  ) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(EXPIRE_REFRESH_TOKEN_KEY, expireRefreshToken);
    localStorage.setItem(EXPIRE_ACCESS_TOKEN_KEY, expireAccessToken);
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRE_ACCESS_TOKEN_KEY);
  },
};
