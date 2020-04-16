const up = (queryInterface, Sequelize) => queryInterface.createTable('Places', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  country: {
    allowNull: false,
    type: Sequelize.STRING
  },
  city: {
    allowNull: false,
    type: Sequelize.STRING
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
const down = (queryInterface) => queryInterface.dropTable('Places');

export {
  up,
  down
};
