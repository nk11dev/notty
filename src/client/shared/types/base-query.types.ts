export type BaseQueryError = {
  status: number| string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data: any,
  name?: string,
  message?: string,
  stack?: string,
  code?: string,
};

export type ApiResponseError = {
  status: 'error',
  error: {
    message: string,
    data?: unknown,
  }
}

export type ApiResponseSuccess = {
  status?: 'success',
  payload?: unknown
}