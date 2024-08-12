export type Response<Data = any> = {
  statusCode: number;
  data?: Data | undefined | null;
  error?: Error;
  message: string;
};

export type PaginationResponse<T> = Response<T> & {
  meta: {
    totalData: number;
    totalView: number;
    maxView: number;
    currentPage: number;
    totalPage: number;
  };
};
