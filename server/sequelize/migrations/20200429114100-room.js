
const up = (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  accommodationId: {
    type: Sequelize.INTEGER,
  },
  roomType: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  numberOfRooms: {
    type: Sequelize.INTEGER,
  },
  roomAmenities: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  roomImages: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
const down = (queryInterface) => queryInterface.dropTable('Rooms');
export {
  up,
  down
};
