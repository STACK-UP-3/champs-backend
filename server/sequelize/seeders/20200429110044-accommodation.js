const up = (queryInterface) => queryInterface.bulkInsert('Accommodations', [
  {
    createdBy: 4,
    name: 'SERENA HOTEL',
    description: 'we can have you any time',
    images: ['https://mcdn.wallpapersafari.com/medium/57/33/UW0jhS.jpg'],
    locationId: 1,
    amenities: 'hey hey You will enjoy',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    createdBy: 4,
    name: 'SERENA HOTEL',
    description: 'we can have you any time',
    images: ['https://mcdn.wallpapersafari.com/medium/57/33/UW0jhS.jpg'],
    locationId: 1,
    amenities: 'hey hey You will enjoy',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const down = (queryInterface) => queryInterface.bulkDelete('Accommodations', null, {});

export {
  up,
  down
};
