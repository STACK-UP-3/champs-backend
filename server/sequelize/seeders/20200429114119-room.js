const up = (queryInterface) => queryInterface.bulkInsert('Rooms', [{
  accommodationId: 1,
  roomType: 'A room with a king-sized bed',
  numberOfRooms: 1,
  roomAmenities: ['breakfast , cleaning and loundry,TV and internet are provided '],
  cost: 500,
  roomImages: ['/images/myfile.jpg'],
  status: 'available',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Rooms', null, {});

export {
  up,
  down
};
