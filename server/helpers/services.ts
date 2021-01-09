export const DatabaseBodyHandler = (body: any): string => {
  var objKeys = Object.keys(body);
  var arr = objKeys.map((key, i) => `"${key}" = $${i + 1}`);
  return arr.join(" , ");
};

export const PaginationHandler = (query: any, primaryKey: string) => {
  var settings = {
    limit: query.limit || 2000,
    offset: query.offset || 0,
    order: query.order || primaryKey,
    type: query.type || "DESC",
  };
  return settings;
};
