const accommodationDefinition = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define(
    'Accommodations',
    {
      createdBy: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amenities: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    },
    {}
  );
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.Place, {
      foreignKey: 'locationId',
      as: 'places',
      onDelete: 'CASCADE'
    });
    Accommodation.hasMany(models.Room, {
      foreignKey: 'accommodationId',
      as: 'Rooms',
      onDelete: 'CASCADE',
    });
  };
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'Users',
      onDelete: 'CASCADE'
    });
  };
  return Accommodation;
};

export default accommodationDefinition;
