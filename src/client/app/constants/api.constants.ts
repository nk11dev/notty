const { SERVER_HOST, API_PATH, AUTH_PATH } = process.env;

export const API_BASE_URL = SERVER_HOST
  ? `${SERVER_HOST}${API_PATH}`
  : API_PATH;

export const AUTH_BASE_URL = SERVER_HOST
  ? `${SERVER_HOST}${AUTH_PATH}`
  : AUTH_PATH;