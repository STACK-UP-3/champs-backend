export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      lastname: { type: DataTypes.STRING },
      firstname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      isVerified: { type: DataTypes.BOOLEAN },
      role: { type: DataTypes.STRING },
      gender: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.INTEGER,
      location: DataTypes.STRING,
      department: DataTypes.STRING,
      emailNotifications: DataTypes.BOOLEAN,
      inAppNotifications: DataTypes.BOOLEAN
    },
  );
  return User;
};
