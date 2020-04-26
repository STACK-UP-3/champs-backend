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
},
{
  userId: 2,
  tripType: 'multi-trip',
  departure: 1,
  destination: [1, 3],
  date: new Date(),
  returnDate: null,
  reasons: 'being a mannager',
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
}
]);

const down = (queryInterface) => queryInterface.bulkDelete('Trips', null, {});

export {
  up,
  down
};
