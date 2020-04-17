import faker from 'faker';

const isVerified = true;
const role = 'Requester';
const id = faker.random.uuid();
const email = faker.internet.email();
const googleId = faker.random.uuid();
const lastname = faker.name.lastName();
const facebookId = faker.random.uuid();
const googleUri = faker.image.dataUri();
const username = faker.name.firstName();
const firstname = faker.name.firstName();
const facebookUri = faker.image.dataUri();

const googleProfile = {
  provider: 'google',
  id,
  displayName: `${firstname} ${lastname}`,
  name: { familyName: lastname, givenName: firstname },
  emails: [{ value: email, type: 'ACCOUNT' }],
  photos: [
    {
      value: `https://lh3.googleusercontent.com/${googleUri}`
    }
  ],
  _json: {
    id,
    email,
    name: { familyName: lastname, givenName: firstname },
    displayName: `${firstname} ${lastname}`,
    image: {
      url: `https://lh3.googleusercontent.com/${googleUri}`
    },
    emails: [[Object]],
    domain: 'google.com',
    locale: 'en',
    kind: 'plus#person',
    etag: '%EgUCAwolLhoDAQUH'
  }
};
const facebookProfile = {
  provider: 'facebook',
  id,
  displayName: `${firstname} ${lastname}`,
  name: { familyName: lastname, givenName: firstname },
  emails: [{ value: email, type: 'ACCOUNT' }],
  photos: [
    {
      value: `https://lh3.googleusercontent.com/${facebookUri}`
    }
  ],
  _json: {
    id,
    email,
    name: { familyName: lastname, givenName: firstname },
    displayName: `${firstname} ${lastname}`,
    image: {
      url: `https://lh3.googleusercontent.com/${facebookUri}`
    },
    emails: [[Object]],
    domain: 'facebook.com',
    locale: 'en',
    kind: 'plus#person',
    etag: '%EgUCAwolLhoDAQUH'
  }
};
const noUserNameProfile = {
  provider: 'google',
  id,
  name: { familyName: lastname, givenName: firstname },
  emails: [{ value: email, type: 'ACCOUNT' }],
  photos: [
    {
      value: `https://lh3.googleusercontent.com/${googleUri}`
    }
  ],
  _json: {
    id,
    email,
    name: { familyName: lastname, givenName: firstname },
    displayName: `${firstname} ${lastname}`,
    image: {
      url: `https://lh3.googleusercontent.com/${googleUri}`
    },
    emails: [[Object]],
    domain: 'google.com',
    locale: 'en',
    kind: 'plus#person',
    etag: '%EgUCAwolLhoDAQUH'
  }
};
const mockData = [
  {
    username,
    firstname,
    lastname,
    email,
    role,
    authType: googleProfile.provider,
    isVerified,
    googleId,

  },
  {
    id,
    username,
    firstname,
    lastname,
    email,
    role,
    authType: googleProfile.provider,
    isVerified,
    googleId,
  },
  {
    id,
    username,
    googleId,
    firstname,
    lastname,
    email,
    role,
    authType: facebookProfile.provider,
    isVerified,
    facebookId,
    password: null,
  },
  {
    email,
    password: 'nevamind1'
  },
  {
    id,
    googleId,
    firstname,
    lastname,
    email,
    role,
    authType: facebookProfile.provider,
    isVerified,
    facebookId,
    password: null,
  },
];

export {
  googleProfile,
  facebookProfile,
  noUserNameProfile,
  mockData
};
