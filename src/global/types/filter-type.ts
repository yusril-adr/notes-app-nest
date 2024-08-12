export type FilterQueryType<T> = {
  eq?: T;
  neq?: T;
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  is?: T;
  in?: T;
};
