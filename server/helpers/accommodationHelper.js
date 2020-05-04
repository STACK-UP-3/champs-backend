import models from '../sequelize/models';


/**
 * This class contains methods
 * that handle accommodation-related operations
 */
class AccommodationHelper {
  /**
   * This method registers an accommodation.
   * @param {object} accommodationData accommodation data.
   * @returns {object} accommodation data.
   */
  static async saveAccommodation(accommodationData) {
    try {
      const { Accommodations } = models;
      const savedAccommodation = await Accommodations.create(
        {
          ...accommodationData,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fields: [
            'createdBy',
            'name',
            'images',
            'description',
            'locationId',
            'cost',
            'amenities',
            'createdAt',
            'updatedAt'
          ]
        }
      );
      return savedAccommodation;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method finds an accommodation.
   * @param {object} data accommodation data.
   * @returns {object} accommodation data.
   */
  static async findAccommodation(data) {
    try {
      const { Accommodations } = models;
      const accommodationFound = await Accommodations.findOne({ where: data });
      return accommodationFound;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method registers a room.
   * @param {object} roomData room information.
   * @returns {object} room information.
   */
  static async registerRoom(roomData) {
    try {
      const { Room } = models;
      const savedRoom = await Room.create({
        ...roomData,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        fields: [
          'accommodationId', 'roomType', 'numberOfRooms', 'roomImages', 'roomAmenities', 'cost', 'status', 'createAt', 'updatedAt'
        ]
      });
      return savedRoom;
    } catch (error) {
      return error;
    }
  }
}

export default AccommodationHelper;
