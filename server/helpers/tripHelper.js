import models from '../sequelize/models';

const {
  Trip,
  User,
  Place
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve
 * the trip data
 */
class TripHelpers {
  /**
     * Finds a trip by reasons and date.
     * @param {string} trip a trip data.
     * @returns {object} trip data.
     */
  static async findByReasonOrDate(trip) {
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
  }

  /**
     * Saves a trip in the DB.
     * @param {object} trip The request sent by a user.
     * @returns {object} trip data.
     */
  static async saveTrip(trip) {
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
        'date',
        'reasons',
        'returnDate',
        'status',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedTrip;
  }

  /**
   * Finds a trip by user role.
   * @param {string} role From user details inside token.
   * @param {integer} id user's Id.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} Trip request data.
   */
  static async findTripByRole(role, id, skip, start) {
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
            {
              model: Place,
              as: 'Destination',
              attributes: [
                'id',
                'name',
                'country',
                'city',
              ]
            }
          ],
          attributes: { exclude: ['departure', 'destination'] },
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
            {
              model: Place,
              as: 'Destination',
              attributes: [
                'id',
                'name',
                'country',
                'city',
              ]
            }
          ],
        attributes: { exclude: ['departure', 'destination'] },
      });
    }
    return foundTrip;
  }

  /**
   * Finds if a user has trip.
   * @param {string} tripId trip id.
   * @param {string} id userId.
   * @param {string} role user role.
   * @returns {object} The trip's data.
   */
  static async findTripById(tripId, { id, role }) {
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
        {
          model: Place,
          as: 'Destination',
          attributes: [
            'id',
            'name',
            'country',
            'city',
          ]
        }
      ],
      attributes: { exclude: ['departure', 'destination'] },
    });

    if (!trip) return false;

    const { lineManager } = trip.User;
    const { userId } = trip;
    if (userId === id || (role === 'Manager' && lineManager === id) || role === 'Super Administrator') return trip;

    return false;
  }
}

export default TripHelpers;
