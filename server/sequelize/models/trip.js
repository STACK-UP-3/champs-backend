module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    'Trip',
    {
      userId: DataTypes.INTEGER,
      tripType: DataTypes.STRING,
      departure: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      date: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      reasons: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {}
  );
  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
      onDelete: 'CASCADE',
    });
    Trip.belongsTo(models.Place, {
      foreignKey: 'departure',
      as: 'Departure',
      constraints: false,
    });
    Trip.belongsTo(models.Place, {
      foreignKey: 'destination',
      as: 'Destination',
      constraints: false,
    });
  };
  return Trip;
};
