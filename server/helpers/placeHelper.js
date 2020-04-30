import models from '../sequelize/models';

/**
 * This class contains
 * methods for handling
 * place operations
 */
class PlaceHelper {
  /**
 * This method checks whether the place exists
 * @param {string} column a value column where value belongs.
 * @param {string} value actual value.
 * @returns {object} User data.
 */
  static async findExistingPlace(column, value) {
    try {
      const { Place } = models;
      const PlaceExist = await Place.findAll({
        where: {
          [column]: value
        }
      });
      return PlaceExist;
    } catch (error) {
      return error;
    }
  }

  /**
 * This method checks whether the place exists using array of ids.
 * @param {string} column a value column where value belongs.
 * @param {string} values actual value.
 * @returns {object} User data.
 */
  static async findPlaceByArray(column, values) {
    try {
      const { Place } = models;
      const places = await Promise.all(values.map(async value => {
        const foundPlaces = await Place.findAll({
          where: {
            [column]: value
          }
        });

        if (foundPlaces[0] === undefined) {
          return { existence: null, value };
        }
        return foundPlaces;
      }));
      return places;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method retrieves all places.
     * @param {interger} skip a skip.
     * @param {interger} start a start.
     * @returns {object} Place data.
     */
  static async retrievePlaces(skip, start) {
    try {
      const { Place } = models;
      const Places = await Place.findAndCountAll({
        limit: skip,
        offset: start,
        order: [['name', 'ASC']],
      });
      return Places;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method saves a place in the database.
     * @param {object} place The request sent by a user.
     * @returns {object} Place data.
     */
  static async savePlace(place) {
    try {
      const { Place } = models;
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
    } catch (error) {
      return error;
    }
  }
}

export default PlaceHelper;
