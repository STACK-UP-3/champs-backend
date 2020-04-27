
const up = (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tripType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  departure: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  destination: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  reasons: {
    type: Sequelize.STRING,
    allowNull: false
  },
  returnDate: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  accommodationId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  },
});
const down = (queryInterface) => queryInterface.dropTable('Trips');

export {
  up,
  down
};
