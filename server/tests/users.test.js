import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

let superAdminDummy2Token;

describe('Users test suite', () => {
  it('1.Super admin login', async () => {
    const res = await router()
      .post('/api/v1/auth/signin')
      .send(usersTester[0]);
    const { data } = res.body;
    superAdminDummy2Token = data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('2.should get users with page and limit', async () => {
    const res = await router()
      .get('/api/v1/users/?page=1&limit=4')
      .set('token', superAdminDummy2Token);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('3.should get users', async () => {
    const res = await router()
      .get('/api/v1/users/')
      .set('token', superAdminDummy2Token);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('4.should get error if send wrong query', async () => {
    const res = await router()
      .get('/api/v1/users/?page=sadsd&limit=sdfds')
      .set('token', superAdminDummy2Token);
    res.should.have.status(400);
    res.body.should.be.an('object');
    res.body.should.have.property('error');
  });
});
