import AccommodationHelper from '../helpers/accommodationHelper';
/**
 * This class contains all methods
 * required to handle
 * accommodations' request.
 */
class AccommodationController {
  /**
   * This method handle the accommodation request.
   * @param {object} req The accommodation's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async requestAccommodation(req, res) {
    try {
      const {
        name,
        description,
        placeId,
      } = req.body;
      const createdBy = req.user.id;
      const accommodationData = await AccommodationHelper.saveAccommodation({
        createdBy,
        name,
        description,
        placeId,
      });
      return res.status(201).json({
        status: 201,
        message: 'Accommodation has accepted!',
        data: {
          createdBy: accommodationData.createdBy,
          name: accommodationData.name,
          description: accommodationData.description,
          placeId: accommodationData.placeId,
          createdAt: accommodationData.createdAt,
          updatedAt: accommodationData.updatedAt
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default AccommodationController;
