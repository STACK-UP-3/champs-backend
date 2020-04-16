import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import usersTester from './mochData/users';
import {
  oneWayTrip,
  incompleteTrip,
  invalidDestinationTrip,
  incoDateTrip,
  incoLocation,
  returnTrip,
  lowReturnTrip,
  multiCityTrip,
} from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);

let notMangerToken;
let superAdminDummy2Token;
let managerToken;
let MangerNoUserToken;

before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[4])
    .end((err, res) => {
      const { data } = res.body;
      notMangerToken = data.token;
      done(err);
    });
});
before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[3])
    .end((err, res) => {
      const { data } = res.body;
      MangerNoUserToken = data.token;
      done(err);
    });
});

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
    .send({ email: 'dummydata01@example.com', password: '123456789' })
    .end((err, res) => {
      const { data } = res.body;
      managerToken = data.token;
      done(err);
    });
});

describe('Trip test suite', () => {
  it('1.should create a trip', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(oneWayTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('2.should not create a trip with simular data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(oneWayTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('3.should not create a trip with incomplete data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(incompleteTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('4.should not create a trip with invalid DestinationTrip data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(invalidDestinationTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('5.should not create a new trip if date is invalide', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(incoDateTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('6.should not create a new trip if location is invalide', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(incoLocation)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('7.should not get a single trip with invilide id ', (done) => {
    router()
      .get('/api/v1/trips/aaa')
      .set('token', superAdminDummy2Token)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('8.should not get a single trip which doesnt beloge to you', (done) => {
    router()
      .get('/api/v1/trips/1')
      .set('token', notMangerToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('9.should get all trip created by the users he/she manage', (done) => {
    router()
      .get('/api/v1/trips/')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('10.should create a trip with return date', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(returnTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('11.should not create a new trip if return date is low than departure date', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(lowReturnTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('12.should not get all trip created by the users he/she manage', (done) => {
    router()
      .get('/api/v1/trips/')
      .set('token', MangerNoUserToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('13.should create a multi-city trip', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notMangerToken)
      .send(multiCityTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});
