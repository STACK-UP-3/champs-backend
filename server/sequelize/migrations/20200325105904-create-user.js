module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isunique: true
    },
    password: {
      type: Sequelize.STRING(1000),
      allowNull: false,
      select: false
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    gender: { type: Sequelize.STRING },
    birthdate: { type: Sequelize.DATEONLY },
    preferredlanguage: { type: Sequelize.STRING },
    preferredcurrency: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    Department: { type: Sequelize.STRING },
    emailNotifications: { type: Sequelize.BOOLEAN },
    inAppNotifications: { type: Sequelize.BOOLEAN },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
