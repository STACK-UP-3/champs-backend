export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
    },
    {},
  );
  return User;
};
