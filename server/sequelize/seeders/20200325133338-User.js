import Hasher from '../../helpers/passwordHashHelper';


const up = (queryInterface) => queryInterface.bulkInsert(
  'Users',
  [{
    firstname: 'dummy',
    lastname: 'Data',
    email: 'dummydata01@example.com',
    password: Hasher.hashPassword('123456789'),
    isVerified: false,
    role: 'Manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'dummy',
    lastname: 'Data',
    email: 'dummydata02@example.com',
    password: Hasher.hashPassword('123456789'),
    isVerified: false,
    role: 'Manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'dummy3',
    lastname: 'Data',
    email: 'dummydata03@example.com',
    password: Hasher.hashPassword('123456789'),
    isVerified: true,
    role: 'Super Administrator',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'dummy4',
    lastname: 'Data',
    email: 'notsuperadmin@example.com',
    password: Hasher.hashPassword('123456789'),
    isVerified: true,
    role: 'Manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'Dumebi',
    lastname: 'Hiu',
    email: 'dev@example.com',
    password: '$2b$10$tDKZuepZakRJQ7wPmtTO9uD2aOd7CdD.R9QNBA1nt45cOTEF1C4rC',
    role: 'Manager',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'Dumebi',
    lastname: 'Hiu',
    email: 'champs@gmail.com',
    password: '$2b$10$tDKZuepZakRJQ7wPmtTO9uD2aOd7CdD.R9QNBA1nt45cOTEF1C4rC',
    role: 'Manager',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstname: 'ag',
    lastname: 'gy',
    email: 'aggyreina@gmail.com',
    password: 'aggy',
    role: 'Manager',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ], {},
);
const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

export {
  up,
  down
};
