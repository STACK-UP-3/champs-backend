import chai from 'chai';
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

describe('user role setting', () => {
  it('1.Super admin login', async () => {
    const res = await router()
      .post('/api/v1/auth/signin')
      .send(usersTester[0]);
    const { data } = res.body;
    superAdminDummy2Token = data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('2.Not super admin login', async () => {
    const res = await router()
      .post('/api/v1/auth/signin')
      .send(usersTester[3]);
    const { data } = res.body;
    notAdminValidToken = data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('3.a signed in super admin should be able to update a particular user role ', async () => {
    const res = await router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', superAdminDummy2Token);
    res.should.have.status(200);
    res.body.should.have.property('message', 'user role updated successfully');
  });

  it('4.a signed in super admin should not be able to update a particular user role with invalid input', async () => {
    const res = await router()
      .patch('/api/v1/users/4/role')
      .send(invalidRole)
      .set('token', superAdminDummy2Token);
    res.should.have.status(400);
    res.body.should.have.property('error');
  });

  it('5.should not update the role of a non registered user', async () => {
    const res = await router()
      .patch('/api/v1/users/500/role')
      .send(validRole)
      .set('token', superAdminDummy2Token);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });

  it('6.should be able to update user role with invalid credentials(token)', async () => {
    const res = await router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', invalidToken);
    res.should.have.status(400);
    res.body.should.have.property('error');
  });

  it('7.super admin should be the only person able to update a particular user role ', async () => {
    const res = await router()
      .patch('/api/v1/users/4/role')
      .send(validRole)
      .set('token', notAdminValidToken);
    res.should.have.status(401);
    res.body.should.have.property('error', 'Sorry! you don\'t have the permission');
  });
  it('8.super admin should not be able to update user without token', async () => {
    const res = await router()
      .patch('/api/v1/users/4/role')
      .send(validRole);
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
});
