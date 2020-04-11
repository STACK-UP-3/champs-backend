const up = (queryInterface) => queryInterface.bulkInsert('Places', [{
  name: 'kigali branch',
  country: 'Rwanda',
  city: 'kigali city',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'new york branch',
  country: 'USA',
  city: 'new york',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  name: 'paris branch',
  country: 'France',
  city: 'paris',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Places', null, {});

export {
  up,
  down
};
