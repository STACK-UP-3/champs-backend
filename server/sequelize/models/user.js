export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      lastname: { type: DataTypes.STRING },
      firstname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      isVerified: { type: DataTypes.BOOLEAN },
      role: { type: DataTypes.STRING },
    },
  );
  return User;
};
