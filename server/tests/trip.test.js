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
  invalidDepartureTrip,
  multiCityTrip,
} from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);

let notManagerToken;
let superAdminDummy2Token;
let managerToken;
let ManagerNoUserToken;

before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[4])
    .end((err, res) => {
      const { data } = res.body;
      notManagerToken = data.token;
      done(err);
    });
});
before((done) => {
  router()
    .post('/api/v1/auth/signin')
    .send(usersTester[3])
    .end((err, res) => {
      const { data } = res.body;
      ManagerNoUserToken = data.token;
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
  it('should create a trip', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(oneWayTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('should not create a trip with simular data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(oneWayTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('should not create a trip with incomplete data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(incompleteTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('should not create a trip with invalid DestinationTrip data', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(invalidDestinationTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('should not create a new trip if date is invalid', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(incoDateTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('should not create a new trip if location is invalid', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(incoLocation)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('should not retrieve a single trip with invalid id ', (done) => {
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
  it('should not retrieve a single trip which does not belong to you', (done) => {
    router()
      .get('/api/v1/trips/1')
      .set('token', notManagerToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('should retrieve all trip created by the users he/she manage', (done) => {
    router()
      .get('/api/v1/trips/')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should create a trip with return date', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(returnTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('should not create a new trip if return date is low than departure date', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(lowReturnTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('object');
        done(err);
      });
  });
  it('should not retrieve all trip created by the users he/she manages', (done) => {
    router()
      .get('/api/v1/trips/')
      .set('token', ManagerNoUserToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should create a multi-city trip', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(multiCityTrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('should not create a trip, location does not exist', (done) => {
    router()
      .post('/api/v1/trips/')
      .set('token', notManagerToken)
      .send(invalidDepartureTrip)
      .end((err, res) => {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.a('string');
        done(err);
      });
  });
  it('should accept a trip request', (done) => {
    router()
      .patch('/api/v1/trips/2')
      .set('token', managerToken)
      .send({
        status: 'accepted'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
  it('should reject a trip request when an invalid status is submitted', (done) => {
    router()
      .patch('/api/v1/trips/1')
      .set('token', managerToken)
      .send({
        status: 'no edit'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('should reject the trip request when the user has no permission', (done) => {
    router()
      .patch('/api/v1/trips/1')
      .set('token', ManagerNoUserToken)
      .send({
        status: 'pending'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('should reject the trip request when the trip doens\'t exist', (done) => {
    router()
      .patch('/api/v1/trips/13456789')
      .set('token', managerToken)
      .send({
        status: 'pending'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
