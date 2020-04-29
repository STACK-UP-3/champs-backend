import AccommodationHelper from '../helpers/accommodationHelper';
import ImageHelper from '../helpers/imageHelper';

/**
 * This class contains all methods
 * required to handle all
 * accommodation-related operations.
 */
class Accommodation {
  /**
   * This method registers accommodation.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} Registered accommodation  .
   */
  static async registerAccomodation(req, res) {
    try {
      const imagePaths = req.body.images;
      const images = await ImageHelper.uploadImages(imagePaths);
      const {
        name,
        description,
        locationId,
        amenities,
        rooms
      } = req.body;
      const { id, role } = req.user;
      name.toUpperCase();
      const createdBy = id;
      if (role === 'Supplier' || role === 'Travel administrator') {
        const accommodationFound = await AccommodationHelper.findAccommodation({ name });
        if (accommodationFound) {
          return res.status(409).json({
            status: 409,
            message: `Accommodation facility was not registered, ${name} already exist`
          });
        }
        const savedAccommodation = await AccommodationHelper.saveAccommodation({
          createdBy,
          name,
          images,
          description,
          locationId,
          amenities
        });

        const {
          id: accommodationId,
          createdBy: userId,
          name: owner,
          description: decribedAccommodation,
          locationId: location,
          images: accommodationImage,
          createdAt,
          updatedAt
        } = savedAccommodation.dataValues;

        const allRegisteredRooms = await Promise.all(rooms.map(async room => {
          const {
            roomType,
            numberOfRooms,
            roomAmenities,
            cost
          } = room;
          const roomImages = await ImageHelper.uploadImages(room.roomImages);

          const registeredRoom = await AccommodationHelper.registerRoom({
            accommodationId,
            roomType,
            numberOfRooms,
            roomImages,
            roomAmenities,
            cost,
            status: 'AVAILABLE',
          });
          return registeredRoom;
        }));

        if (savedAccommodation && allRegisteredRooms) {
          return res.status(201).json({
            status: 201,
            message: 'Accomodation facility registered succesfully',
            data: {
              owner,
              userId,
              location,
              description: decribedAccommodation,
              accommodationImage,
              createdAt,
              updatedAt,
              rooms: allRegisteredRooms
            }
          });
        }
      }
      return res.status(401).json({
        status: 401,
        message: 'You don’t have the permission for registering an accommodation'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong when registering the accommodation facility',
        error: error.message
      });
    }
  }
}

export default Accommodation;
