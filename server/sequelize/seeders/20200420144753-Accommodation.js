const up = (queryInterface) => queryInterface.bulkInsert('Accommodation', [{
  createdBy: 1,
  name: 'hotel1',
  description: 'visit home',
  placeId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  createdBy: 2,
  name: 'hotel2',
  description: 'trip home',
  placeId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  createdBy: 3,
  name: 'hotel3',
  description: 'nightt',
  placeId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodation', null, {});

export {
  up,
  down
};
