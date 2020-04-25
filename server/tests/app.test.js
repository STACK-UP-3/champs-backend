import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('App Test Suite', () => {
  it('should redirect user to the home endpoint when they visit invalid endpoint', (done) => {
    router()
      .get('/donotexist')
      .end((error, response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(200);
        expect(response.body).to.have.property('message');
        done(error);
      });
  });

  it('should allow user to visit the home endpoint', (done) => {
    router()
      .get('/')
      .end((error, response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(200);
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
});
