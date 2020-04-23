import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';
import app from '../index';

config();
chai.use(chaiHttp);
const router = () => chai.request(app);
describe('POST data to SIGNUP', () => {
  const user = [{
    lastname: 'Dummy',
    firstname: 'Data01',
    email: 'dummyData0001@gmail.com',
    username: 'dummydata001',
    password: '123456',
  }, {
    lastname: 'Dummy',
    firstname: 'Data02',
    email: 'chgris02gmail.com',
    username: 'dummydatao2',
    password: '123456',
  }, {
    lastname: 'Dummy',
    firstname: 'Data02',
    email: 'dummyData0001@gmail.com',
    username: 'dummydatao1',
    password: '123456',
  }, {
    lastname: 'Dummy',
    firstname: 'Data03',
    username: 'dummydatao1',
    email: 'dummydata03@gmail.co',
  }];
  it('should signup user', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(user[0])
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('should return an error when data sent are not valid ', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(user[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should return an error when email sent is already in use ', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(user[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should return an error if the data sent are not full', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(user[3])
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
});
describe('GET token to verify sign up', () => {
  it('should not return an object ', (done) => {
    const token = 'ertfyguhajbdcgacbadjcmadivjdahnvvadcdvhbvdbavbdavdahvdhadndan;adnvjladbvdbhdkabbvabvbfv';
    router()
      .get(`/api/v1/auth/verify/${token}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return an object ', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ2d5cmVpbmFAZ21haWwuY29tIiwiaWF0IjoxNTg2Mzg3NDk3fQ.G2huyQ7JiLvQjgaaUIkXZNXs0OHwRY35RirFgOGkV3I';
    router()
      .get(`/api/v1/auth/verify/${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
});
