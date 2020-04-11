import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../index';

config();
chai.use(chaiHttp);
const router = () => chai.request(app);
const user = [{
  lastname: 'Dummy',
  firstname: 'Data01',
  gender: 'male',
  birthDate: 'jan 20, 2000',
  preferredLanguage: 'kinyarwanda',
  preferredCurrency: 'dollars',
  location: 'kigali , Rwanda',
  department: 'IT',
  emailNotifications: true,
  inAppNotifications: false
}, {
  lastname: 'Dummy',
  firstname: 'Data02',
  gender: 'male',
  birthdate: '23/13/2039',
  preferredlanguage: 'kinyarwanda',
  preferredcurrency: 'dollars',
  location: 'kigali , Rwanda',
  Department: 'IT',
  emailNotifications: false,
  inAppNotifications: false
},
{
  lastname: 'Ineza',
  firstname: 'Brian',
  birthDate: 'jan 20, 2000',
  preferredlanguage: 'kinyarwanda',
  preferredcurrency: 'dollars',
  location: 'kigali , Rwanda',
  Department: 'IT',
  emailNotifications: true,
  inAppNotifications: false
}, {
  lastname: 'Dummy',
  firstname: 'Data01',
  username: 'dummydata001',
  gender: 'male',
  birthDate: 'jan 20, 2000',
  preferredLanguage: 'kinyarwanda',
  preferredCurrency: 'dollars',
  location: 'kigali , Rwanda',
  department: 'IT',
  emailNotifications: true,
  inAppNotifications: false
}];
let userToken;

before((done) => {
  const userLogin = {
    email: 'dummydata01@example.com',
    password: '123456789'
  };
  router()
    .post('/api/v1/auth/signin')
    .send(userLogin)
    .end((err, res) => {
      if (err) done(err);
      userToken = res.body.data.token;
      done();
    });
});

describe('patch data to UPDATE', () => {
  it('should update a user', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .send(user[0])
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
  it('should return an error when all notifications are turned off', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .set('token', userToken)
      .send(user[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should return an error when Data sent are not full', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .set('token', userToken)
      .send(user[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should return an error if there is no token', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .send(user[3])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('should return an error if the username used is already in use', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .set('token', userToken)
      .send(user[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('should return an error if the username used doesn\'t match the one used in login', (done) => {
    router()
      .patch('/api/v1/user/dummydata001/profile')
      .set('token', userToken)
      .send(user[0])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  const wrongToken = 'wectgvkhbgjucgfgvbkhjlkmdcfdcvsbvhysvcshc';
  it('should return an error if there is invalid token', (done) => {
    router()
      .patch('/api/v1/user/dummydata01/profile')
      .set('token', wrongToken)
      .send(user[3])
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
describe('GET data to profile ', () => {
  it('should return the information', (done) => {
    router()
      .get('/api/v1/user/dummydata01/profile')
      .set('token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
  it('should return an error as the username used doesn\'t exist', (done) => {
    router()
      .get('/api/v1/user/dummydata/profile')
      .set('token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
});
