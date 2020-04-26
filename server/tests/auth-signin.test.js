import 'dotenv';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../index';
import { users } from './mochData/fixtures.json';

chai.should();
chai.use(chaiHttp);

describe('SignIn Test Suite', () => {
  it('should allow user to sign in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should not allow user to sign in when password is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[1])
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should not allow user to sign in when they are not registered', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[2])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it("should not allow user to sign in when they don't provide email", (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[3])
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it("should not allow user to sign in when they don't provide password", (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[4])
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should not allow user to sign in when they provide incorrect credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(users[5])
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
