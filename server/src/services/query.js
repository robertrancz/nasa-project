// if not defined in the query, MongoDB will return all documents in the collection.
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {

  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const offset = (page - 1) * limit;

  return { offset, limit };
}

module.exports = { getPagination };