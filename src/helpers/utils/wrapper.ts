import { Response, PaginationResponse } from '@global/types/response.type';

type ResponseParams<T> = Omit<Response<T>, 'statusCode'> & {
  statusCode?: number;
};

export const response = <T>(params: ResponseParams<T>): Response<T> => {
  const { statusCode = 200, data = undefined, message } = params;
  return {
    statusCode,
    data,
    message,
  };
};

type PaginationResponseParams<T> = Omit<PaginationResponse<T>, 'statusCode'> & {
  statusCode?: number;
};

export const paginationResponse = <T>(
  params: PaginationResponseParams<T>,
): PaginationResponse<T> => {
  const { statusCode = 200, data = null, meta, message } = params;
  return {
    statusCode,
    data,
    meta,
    message,
  };
};
