export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      authType: DataTypes.STRING,
      lineManager: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      location: DataTypes.STRING,
      department: DataTypes.STRING,
      emailNotifications: DataTypes.BOOLEAN,
      inAppNotifications: DataTypes.BOOLEAN,
      googleId: DataTypes.STRING,
      facebookId: DataTypes.STRING,
      profileImage: DataTypes.STRING
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Trip, {
      foreignKey: 'userId',
      as: 'Trips',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.User, {
      foreignKey: 'lineManager',
      as: 'Users',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
