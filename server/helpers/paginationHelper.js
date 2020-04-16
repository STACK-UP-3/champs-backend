/**
 * This class contains all methods
 * required to handle
 * paginations.
 */
class PaginatingData {
  /**
 * This method handle the pagination of retrieved data.
 * @param {object} pages The page number.
 * @param {object} limits The limits of data.
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
export default PaginatingData;
