/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'dummy',
        lastname: 'Data',
        email: 'dummydata01@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'dummy',
        lastname: 'Data',
        email: 'dummydata02@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
