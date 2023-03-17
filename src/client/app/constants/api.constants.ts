export const API_BASE_URL = (process.env.API_HOST)
  ? `${process.env.API_HOST}${process.env.API_PATH}`
  : process.env.API_PATH;