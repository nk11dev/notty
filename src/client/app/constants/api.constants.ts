// const API_PATH = '/api';
const API_PATH = '/api-example';

export const API_URL = (process.env.API_HOST)
  ? `${process.env.API_HOST}${API_PATH}`
  : API_PATH;