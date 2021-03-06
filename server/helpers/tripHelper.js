import models from '../sequelize/models';

const {
  Trip,
  User,
  Place
} = models;

/**
 * This class contains
 * methods for handling trip operations.
 */
class TripHelper {
  /**
     * This method finds a trip by reason or date.
     * @param {string} trip trip data.
     * @returns {object} trip data.
     */
  static async findByReasonOrDate(trip) {
    try {
      const {
        userId,
        reasons,
        destination,
        date
      } = trip;
      const newDate = new Date(date);
      const tripExist = await Trip.findOne({
        where: {
          userId,
          reasons,
          destination,
          date: newDate
        }
      });
      return tripExist;
    } catch (error) {
      return error;
    }
  }

  /**
     * This method saves a trip in database.
     * @param {object} trip trip data.
     * @returns {object} trip data.
     */
  static async saveTrip(trip) {
    try {
      const acceptedTrip = await Trip.create({
        ...trip,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        fields: [
          'userId',
          'tripType',
          'departure',
          'destination',
          'accommodationId',
          'date',
          'reasons',
          'returnDate',
          'status',
          'createAt',
          'updatedAt'
        ]
      });

      return acceptedTrip;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method finds a trip by role.
   * @param {string} role user role.
   * @param {integer} id user Id.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} trip data.
   */
  static async findTripByRole(role, id, skip, start) {
    try {
      let foundTrip = { rows: [], count: 0 };
      if (role === 'Manager') {
        const assignedUsers = await User.findAndCountAll({
          where: { lineManager: id },
          attributes: ['id', 'firstname', 'email', 'lastname', 'role', 'lineManager']
        });

        if (assignedUsers.count > 0) {
          const users = assignedUsers.rows.map((user) => user.id);

          foundTrip = await Trip.findAndCountAll({
            where: { userId: users },
            limit: skip,
            offset: start,
            order: [['createdAt', 'DESC']],
            include:
              [
                {
                  model: User,
                  as: 'User',
                  attributes: [
                    'id',
                    'lineManager',
                    'firstname',
                    'lastname',
                    'email',
                    'role',
                  ]
                },
                {
                  model: Place,
                  as: 'Departure',
                  attributes: [
                    'id',
                    'name',
                    'country',
                    'city',
                  ]
                },
              ],
            attributes: { exclude: ['departure'] },
          });
        }
      } else {
        foundTrip = await Trip.findAndCountAll({
          where: { userId: id },
          limit: skip,
          offset: start,
          order: [['id', 'DESC']],
          include:
            [
              {
                model: User,
                as: 'User',
                attributes: [
                  'id',
                  'lineManager',
                  'firstname',
                  'lastname',
                  'email',
                  'role',
                ]
              },
              {
                model: Place,
                as: 'Departure',
                attributes: [
                  'id',
                  'name',
                  'country',
                  'city',
                ]
              },
            ],
          attributes: { exclude: ['departure'] },
        });
      }
      return foundTrip;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method finds a trip by id.
   * @param {string} tripId trip id.
   * @param {string} id user id.
   * @param {string} role user role.
   * @returns {object} trip data.
   */
  static async findTripById(tripId, { id, role }) {
    try {
      const trip = await Trip.findOne({
        where: { id: tripId },
        include: [
          {
            model: User,
            as: 'User',
            attributes: [
              'id',
              'lineManager',
              'firstname',
              'lastname',
              'email',
              'role',
              'department'
            ]
          },
          {
            model: Place,
            as: 'Departure',
            attributes: [
              'id',
              'name',
              'country',
              'city',
            ]
          },
        ],
        attributes: { exclude: ['departure'] },
      });

      if (!trip) return false;

      const { lineManager } = trip.User;
      const { userId } = trip;
      if (userId === id || (role === 'Manager' && lineManager === id) || role === 'Super Administrator') return trip;
      return false;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method updates a trip by id.
   * @param {string} tripId trip id.
   * @param {object} data new data of the trip
   * @returns {object} updated trip data.
   */
  static async updateTripById(tripId, data) {
    try {
      const [, updatedTrip] = await Trip.update(data, {
        where: { id: tripId },
        returning: true,
        plain: true
      });
      if (updatedTrip) return updatedTrip;
      return false;
    } catch (error) {
      return error;
    }
  }
}

export default TripHelper;
