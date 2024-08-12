export const transformFilterDto = ({ value }) => {
  const formatedValue = value;
  Object.keys(value).forEach((key) => {
    Object.keys(value[key]).forEach((operator) => {
      if (value[key][operator]?.toLowerCase() === 'true') {
        formatedValue[key][operator] = true;
      } else if (value[key][operator]?.toLowerCase() === 'false') {
        formatedValue[key][operator] = false;
      }
    });
  });

  return formatedValue;
};

export const parseSupabaseFilterQuery = (filter, query) => {
  const keys = Object.keys(filter);

  let filterQuery = query;

  keys.forEach((key) => {
    Object.keys(filter[key]).forEach((operator) => {
      filterQuery = filterQuery[operator](key, filter[key][operator]);
    });
  });

  return filterQuery;
};
