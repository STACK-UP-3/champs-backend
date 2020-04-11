import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import usersTester from './mochData/users';

chai.use(chaiHttp);
chai.should();
const router = () => chai.request(app);

const validRole = { role: 'Requester' };
const invalidRole = { role: 'Rqstr' };

let superAdminDummy2Token;
let notAdminValidToken;
const invalidToken = 'eyJhbGciOiJIUzi1NiIsInR5cCI6IkpXVCJ9.erefdsrfresdasd333eyJTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA';


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

before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[3])
    .end((err, res) => {
      const { data } = res.body;
      notAdminValidToken = data.token;
      done(err);
    });
});

describe('user role setting', () => {
  it('1.a signed in super admin should be able to update a particular user role ', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('2.a signed in super admin should not be able to update a particular user role with invalid input', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(invalidRole)
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });

  it('3.should not update the role of a non registered user', (done) => {
    router()
      .patch('/api/v1/users/500/role')
      .send(validRole)
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });

  it('4.should be able to update user role with invalid credentials(token)', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', invalidToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });

  it('5.super admin should be the only person able to update a particular user role ', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', notAdminValidToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('6.super admin should not be able to update user without token', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('7.should be able to update user role with invalid credentials(token)', (done) => {
    router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', 1)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
