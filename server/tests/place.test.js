import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

let superAdminDummy2Token;

const thisPlace = {
  name: 'burundi branch',
  country: 'burundi',
  city: 'bujumbura'
};
const fakePlace = {
  name: 'burundi branch',
  city: 'bujumbura'
};

before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[0])
    .end((err, res) => {
      const { data } = res.body;
      superAdminDummy2Token = data.token;
      done(err);
    });
});

describe('Place test suite', () => {
  it('1.should get places with page and limit', (done) => {
    router()
      .get('/api/v1/places/?page=1&limit=4')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('2.should get places', (done) => {
    router()
      .get('/api/v1/places/')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('3.should get error if send wrong query', (done) => {
    router()
      .get('/api/v1/places/?page=sadsd&limit=sdfds')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('4.should get message if send wrong query', (done) => {
    router()
      .get('/api/v1/places/?page=2&limit=1')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('5.should get single place', (done) => {
    router()
      .get('/api/v1/places/1')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('6.should get error if send wrong id', (done) => {
    router()
      .get('/api/v1/places/adad')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('7.should get error if send wrong id which doesn\'t exist', (done) => {
    router()
      .get('/api/v1/places/100')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('8.should create a place', (done) => {
    router()
      .post('/api/v1/places/')
      .set('token', superAdminDummy2Token)
      .send(thisPlace)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('9.should not create a place', (done) => {
    router()
      .post('/api/v1/places/')
      .set('token', superAdminDummy2Token)
      .send(fakePlace)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
