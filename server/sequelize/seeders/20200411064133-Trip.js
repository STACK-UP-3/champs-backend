const up = (queryInterface) => queryInterface.bulkInsert('Trips', [
  {
    userId: 1,
    tripType: 'One-way',
    departure: 1,
    destination: 2,
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 5,
    tripType: 'One-way',
    departure: 1,
    destination: 2,
    date: new Date(),
    returnDate: null,
    reasons: 'being a mannager',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 7,
    tripType: 'One-way',
    departure: 1,
    destination: 2,
    date: new Date(),
    returnDate: null,
    reasons: 'being a development manager',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};
