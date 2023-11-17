import { validFields } from './validFields';

export const capitalize = (model: string) => {
  return String(model).charAt(0).toUpperCase() + String(model).slice(1);
};
export const convertSortToObject = (
  sortingString: string
): Record<string, string> => {
  const sortingCriteria = sortingString.split('&');
  const sortingObject: Record<string, string> = {};

  sortingCriteria.forEach((criteria) => {
    let field = criteria;
    let direction = 'asc';

    if (criteria.startsWith('-')) {
      field = criteria.slice(1);
      direction = 'desc';
    }

    sortingObject[field] = direction;
  });

  return sortingObject;
};

export const convertFieldsToObject = (
  fieldsString: string
): Record<string, boolean> => {
  const fieldsCriteria = fieldsString.split('&');
  const fieldsObject: Record<string, boolean> = {};

  fieldsCriteria.forEach((criteria) => {
    let field = criteria;
    let direction = true;
    fieldsObject[field] = direction;
  });

  return fieldsObject;
};

export const convertKeywordsToObject = (
  fieldsString: string
): Record<string, any> => {
  const fieldsCriteria = fieldsString.split('&');

  return fieldsCriteria.map((word) => ({
    OR: [
      {
        title: {
          search: word,
          mode: 'insensitive'
        }
      },
      {
        description: {
          search: word,
          mode: 'insensitive'
        }
      },
      {
        courseSteps: {
          some: {
            OR: [
              {
                title: {
                  search: word,
                  mode: 'insensitive'
                }
              },
              {
                content: {
                  search: word,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      }
    ]
  }));
};

export const convertFiltersToObject = (
  queryParams: Record<string, any>,
  model: string
) => {
  console.log('Query before', queryParams);

  const filteredFilters = Object.keys(queryParams).filter((key) =>
    validFields[String(model)].includes(key)
  );
  const filteredFiltersObject: Record<string, any> = {};

  for (const key of filteredFilters) {
    filteredFiltersObject[key] = queryParams[key];
  }

  // Initialize an empty filter object
  const prismaFilter: Record<string, any> = {};

  for (const key in filteredFiltersObject) {
    if (filteredFiltersObject.hasOwnProperty(key)) {
      const value = filteredFiltersObject[key];

      // Check if the key contains a filter criterion
      if (key.includes('[') && key.includes(']')) {
        const [field, operator] = key.split('[');
        const criterion = operator.substring(0, operator.length - 1);

        // Check the criterion and set the filter accordingly
        if (criterion === 'gte') {
          prismaFilter[field] = { gte: value };
        } else if (criterion === 'lte') {
          prismaFilter[field] = { lte: value };
        } else if (criterion === 'gt') {
          prismaFilter[field] = { gt: value };
        } else if (criterion === 'lt') {
          prismaFilter[field] = { lt: value };
        } else if (criterion === 'eq') {
          prismaFilter[field] = value;
        } else if (key === 'contains') {
          prismaFilter[key] = { contains: value };
        } else if (key === 'startsWith') {
          prismaFilter[key] = {
            startsWith: value
          };
        } else if (key === 'endsWith') {
          prismaFilter[key] = {
            endsWith: value
          };
        } else {
          prismaFilter[key] = value;
        }
      }
    }
  }
  return prismaFilter;
};

export const pagingsObject = async (
  count: number,
  queryStr: Record<string, any>
) => {
  const page = queryStr.page || 1;
  const limit = queryStr.limit || 5;
  const skip = (page - 1) * limit;
  const endI = page * limit;
  const paging: Record<string, any> = {};

  paging.CurrentPage = Number(page);
  paging.TotalPages = Math.ceil(count / limit);
  paging.TotalResults = count;
  paging.limit = Number(limit);
  if (endI < count) paging.next = Number(page) + 1;
  if (skip > 0) paging.prev = Number(page) - 1;
  return {
    skip,
    take: Number(limit),
    paging
  };
};

export const includeObject = async (
  included: string[],
  objectQuery: Record<string, any>
) => {
  const query: Record<string, any> = { ...objectQuery, include: {} };
  if (included && Array.isArray(included)) {
    included.forEach((field) => {
      query.include[field] = true;
    });
  }
  return query;
};
