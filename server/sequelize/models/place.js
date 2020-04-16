module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Place.associate = (models) => {
    Place.hasMany(models.Trip, {
      foreignKey: 'departure',
      as: 'Departure',
      onDelete: 'CASCADE',
    });
    Place.hasMany(models.Trip, {
      foreignKey: 'destination',
      as: 'Destination',
      onDelete: 'CASCADE',
    });
  };
  return Place;
};
