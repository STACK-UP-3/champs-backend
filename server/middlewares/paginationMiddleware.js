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
    req.data.paginate.paginate = req.data.userAllData;
    if (req.data.start > 0) {
      req.data.paginate.Previous = {
        page: req.data.pages - 1,
        limit: req.data.skip
      };
    } if (req.data.end < req.data.countUserData) {
      req.data.paginate.Next = {
        page: req.data.pages + 1,
        limit: req.data.skip
      };
    }
    return res.status(200).json({
      status: 200,
      message: `${req.user.email} Those are data from this page ${req.data.pages}`,
      data: req.data.paginate
    });
  }
}
export default PaginateData;
