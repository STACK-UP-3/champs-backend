import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../index';
import users from './mochData/users';
import {
  validAccommodation,
  invalidAccommodation,
  existingAccommodation,
  invalidLocationAccommodation
} from './mochData/accommodation';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Accomodation Test Suite', () => {
  describe('accommodation registration with authorized user', () => {
    let authorizedToken;

    before((done) => {
      router()
        .post('/api/v1/auth/signin')
        .send(users[6])
        .end((err, res) => {
          const { data } = res.body;
          authorizedToken = data.token;
          done(err);
        });
    });
    it('Should register accommodation successfully', (done) => {
      router()
        .post('/api/v1/accommodation')
        .set('token', authorizedToken)
        .send(validAccommodation)
        .end((error, response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.status).to.be.equal(201);
          expect(response.body).to.have.property('message');
          done(error);
        });
    });

    it('Should not register accommodation when invalid data is submitted', (done) => {
      router()
        .post('/api/v1/accommodation')
        .set('token', authorizedToken)
        .send(invalidAccommodation)
        .end((error, response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.status).to.be.equal(422);
          expect(response.body).to.have.property('error');
          done(error);
        });
    });

    it('Should not register accommodation when invalid location is submitted', (done) => {
      router()
        .post('/api/v1/accommodation')
        .set('token', authorizedToken)
        .send(invalidLocationAccommodation)
        .end((error, response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.status).to.be.equal(422);
          expect(response.body).to.have.property('error');
          done(error);
        });
    });

    it('Should not register accommodation when It already exists', (done) => {
      router()
        .post('/api/v1/accommodation')
        .set('token', authorizedToken)
        .send(existingAccommodation)
        .end((error, response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.status).to.be.equal(409);
          expect(response.body).to.have.property('message');
          done(error);
        });
    });
  });

  describe('accommodation registration with un-authorized user', () => {
    let unAuthorizedToken;

    before((done) => {
      router()
        .post('/api/v1/auth/signin')
        .send(users[4])
        .end((err, res) => {
          const { data } = res.body;
          unAuthorizedToken = data.token;
          done(err);
        });
    });

    it('Should not register accommodation when user is not authorized to do so', (done) => {
      router()
        .post('/api/v1/accommodation')
        .set('token', unAuthorizedToken)
        .send(validAccommodation)
        .end((error, response) => {
          expect(response.body).to.be.a('object');
          expect(response.body.status).to.be.equal(401);
          expect(response.body).to.have.property('message');
          done(error);
        });
    });
  });
});
