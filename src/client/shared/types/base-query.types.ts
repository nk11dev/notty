export type BaseQueryError = {
  status?: number;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data: any,
  name?: string,
  message?: string,
  stack?: string,
  code?: string,
};