import 'dotenv';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';

import app from '../index';
import { users } from '../config/fixtures.json';

chai.should();
chai.use(chaiHttp);


describe('Test sign in', () => {
  it('User can sign in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(users[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('password is invalid', (done) => {
    chai.request(app)
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
  it('email not found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(users[2])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('email is empty', (done) => {
    chai.request(app)
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
  it('password is empty', (done) => {
    chai.request(app)
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

  it('password not found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(users[5])
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
