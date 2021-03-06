import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

let superAdminDummy2Token;

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

describe('Users test suite', () => {
  it('1.should get users with page and limit', (done) => {
    router()
      .get('/api/v1/users/?page=1&limit=4')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('2.should get users', (done) => {
    router()
      .get('/api/v1/users/')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('3.should get error if send wrong query', (done) => {
    router()
      .get('/api/v1/users/?page=sadsd&limit=sdfds')
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
      .get('/api/v1/users/?page=2&limit=1')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('5.should get single user', (done) => {
    router()
      .get('/api/v1/users/1')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('6.should get error if send wrong query', (done) => {
    router()
      .get('/api/v1/users/adad')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('7.should get error if send wrong query', (done) => {
    router()
      .get('/api/v1/users/100')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
