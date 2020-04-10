/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'dummy',
        lastname: 'Data',
        email: 'dummydata01@example.com',
        password: '$2b$10$S3BKAin7MvNigw8VX0qL0uVOZtrxSQCUahIvuAFnR679t6lS3HqyW',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'dummy',
        lastname: 'Data',
        email: 'dummydata02@example.com',
        password: 'wersjjjsnmjdnjhtedtn',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstname: 'Dumebi',
        lastname: 'Hiu',
        email: 'dev@example.com',
        password: '$2b$10$tDKZuepZakRJQ7wPmtTO9uD2aOd7CdD.R9QNBA1nt45cOTEF1C4rC',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Dumebi',
        lastname: 'Hiu',
        email: 'champs@gmail.com',
        password: '$2b$10$tDKZuepZakRJQ7wPmtTO9uD2aOd7CdD.R9QNBA1nt45cOTEF1C4rC',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'ag',
        lastname: 'gy',
        email: 'aggyreina@gmail.com',
        password: 'aggy',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
