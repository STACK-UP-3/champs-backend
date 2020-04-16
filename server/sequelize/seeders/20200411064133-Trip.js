const up = (queryInterface) => queryInterface.bulkInsert('Trips', [{
  userId: 1,
  tripType: 'One-way',
  departure: 1,
  destination: [2],
  date: new Date(),
  returnDate: null,
  reasons: 'being a mannager',
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
  accommodationId: 2
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};
