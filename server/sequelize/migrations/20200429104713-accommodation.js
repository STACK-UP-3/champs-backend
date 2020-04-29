const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  createdBy: { type: Sequelize.INTEGER },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  images: { type: Sequelize.ARRAY(Sequelize.TEXT) },
  locationId: { type: Sequelize.INTEGER },
  amenities: { type: Sequelize.STRING },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

const down = (queryInterface) => queryInterface.dropTable('Accommodations');

export {
  up,
  down
};
