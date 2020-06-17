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
    googleId: {
      type: Sequelize.STRING,
    },
    facebookId: {
      type: Sequelize.STRING,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isunique: true
    },
    password: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      select: false
    },
    confirmPassword: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      select: false
    },
    role: {
      type: Sequelize.STRING,
    },
    authType: {
      type: Sequelize.STRING
    },
    lineManager: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATEONLY
    },
    preferredLanguage: {
      type: Sequelize.STRING
    },
    preferredCurrency: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    emailNotifications: {
      type: Sequelize.BOOLEAN
    },
    inAppNotifications: {
      type: Sequelize.BOOLEAN
    },
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
