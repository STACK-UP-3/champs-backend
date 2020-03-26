
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  return User;
};
