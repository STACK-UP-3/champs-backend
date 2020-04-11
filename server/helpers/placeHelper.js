import models from '../sequelize/models';

const {
  Place
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the Place data
 */
class PlaceHelpers {
  /**
 * find a user with a condition.
 * @param {string} attr .
 * @param {string} val .
 * @returns {object} User data.
 */
  static async placeExist(attr, val) {
    const PlaceExist = await Place.findAll({
      where: {
        [attr]: val
      }
    });
    return PlaceExist;
  }

  /**
     * Finds a all Place.
     * @param {interger} skip a skip.
     * @param {interger} start a start.
     * @returns {object} Place data.
     */
  static async allPlace(skip, start) {
    const Places = await Place.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['name', 'ASC']],
    });
    return Places;
  }

  /**
     * Saves a Place in the DB.
     * @param {object} place The request sent by a user.
     * @returns {object} Place data.
     */
  static async savePlace(place) {
    const acceptedPlace = await Place.create({
      ...place,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields: [
        'name',
        'country',
        'city',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedPlace;
  }
}

export default PlaceHelpers;
