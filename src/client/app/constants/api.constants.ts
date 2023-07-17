const { API_HOST, API_PATH } = process.env;

export const API_BASE_URL = API_HOST
  ? `${API_HOST}${API_PATH}`
  : API_PATH;