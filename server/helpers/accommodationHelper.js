import models from '../sequelize/models';

const { Accommodation } = models;

/**
 * This class contains
 * all methods required to handle
 * the Accommodation data
 */
class AccommodationHelper {
  /**
   * Saves a Accommodation in the DB.
   * @param {object} accommodation The request sent by a user.
   * @returns {object} Accommodation data.
   */
  static async saveAccommodation(accommodation) {
    const createdAccommodation = await Accommodation.create(
      {
        ...accommodation,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: [
          'createdBy',
          'name',
          'description',
          'placeId',
          'createdAt',
          'updatedAt'
        ]
      }
    );

    return createdAccommodation;
  }


  /**
   * Finds if accommodation exists in a certain place.
   * @param {string} accommodations a Accommodation data.
   * @returns {object} Accommodation data.
   */
  static async findAccommodation(accommodations) {
    const { id, placeIds } = accommodations;
    const findCreatedAccommodation = await Accommodation.findOne({
      where: {
        id,
        placeId: placeIds
      }
    });
    return findCreatedAccommodation;
  }
}

export default AccommodationHelper;
