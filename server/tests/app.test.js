import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('app test suite', () => {
  it('users should be redirected to api root when he/she used wrong link', (done) => {
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
});
