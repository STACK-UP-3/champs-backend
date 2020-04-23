/**
 * This class contains methods
 * for handling pagination
 */
class DataPagination {
  /**
 * This method pagenates data.
 * @param {object} page The page number.
 * @param {object} limit The limit of data.
 * @returns {object} The limit and skip.
 */
  static paginateData({ page, limit }) {
    const paginate = {};
    const skip = Number(limit || 10);
    const pages = Number(page || 1);
    const start = Number((pages - 1) * skip);
    const end = page * skip;
    return {
      start, end, pages, skip, paginate
    };
  }
}

export default DataPagination;
