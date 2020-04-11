/**
 * This class contains all methods
 * required to handle
 * paginations.
 */
class PaginateData {
  /**
     * This method handle the pagination of retrieved data.
     * @param {object} req The user request.
     * @param {object} res The response.
     * @returns {object} The paginated data.
     */
  static paginatedRetrievedData(req, res) {
    req.data.paginate.results = req.data.paginatedData;
    const {
      start, end, dataCount, pages, skip
    } = req.data;
    const totalPage = Math.ceil(dataCount / skip);
    if (start > 0) {
      req.data.paginate.Previous = {
        page: pages - 1,
        limit: skip
      };
    } if (end < dataCount) {
      req.data.paginate.Next = {
        page: pages + 1,
        limit: skip
      };
    }
    return res.status(200).json({
      status: 200,
      message: `Those are data from page ${req.data.pages}`,
      pages: totalPage,
      data: req.data.paginate
    });
  }
}
export default PaginateData;
