function convertSortingStringToObject(sortingString) {
  const sortingCriteria = sortingString.split('&');
  const sortingObject = {};

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
}
console.log(convertSortingStringToObject('-name&-direction&email'));
