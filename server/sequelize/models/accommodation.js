module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    createdBy: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    placeId: DataTypes.INTEGER,
  }, {});
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.Place, {
      foreignKey: 'placeId',
      as: 'places',
      onDelete: 'CASCADE'
    });
    Accommodation.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'Users',
      onDelete: 'CASCADE'
    });
    Accommodation.hasMany(models.Trip, {
      foreignKey: 'accommodationId',
      as: 'tripAccommodation',
      onDelete: 'CASCADE'
    });
  };
  return Accommodation;
};
