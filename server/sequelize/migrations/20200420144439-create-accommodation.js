const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  createdBy: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  placeId: {
    type: Sequelize.INTEGER,
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
const down = (queryInterface) => queryInterface.dropTable('Accommodation');

export {
  up,
  down
};
