export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      preferredlanguage: DataTypes.STRING,
      preferredcurrency: DataTypes.INTEGER,
      location: DataTypes.STRING,
      Department: DataTypes.STRING,
      emailNotifications: DataTypes.BOOLEAN,
      inAppNotifications: DataTypes.BOOLEAN
    },
  );
  return User;
};
