import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Test resetting user password endpoint', () => {
  const user = {
    email: 'aggy@gmail.com',
    emailSuccess: 'chrischris@example.com',
    email0: '',
    emailFail: 'aggyreina@gmail.com',
    password: 'aggggg',
    passwordConfirm: 'aggggg',
    password0: 'were123',
    noPassword: '',
  };

  it('should send a password reset link email to a user', (done) => {
    router()
      .post('/api/v1/auth/reset-link')
      .send({ email: user.emailSuccess })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(200);
        done();
      });
  });

  it('should enter your email to get a reset link', (done) => {
    chai.request(app)
      .post('/api/v1/auth/reset-link')
      .send({ email: user.email0 })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should update user password', (done) => {
    router()
      .post(process.env.TEST_URL)
      .send({ password: user.password, passwordConfirm: user.passwordConfirm })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(200);
        done();
      });
  });

  it('should not update user password, mismatch', (done) => {
    router()
      .post(process.env.TEST_URL)
      .send({ password: user.password, passwordConfirm: user.password0 })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });


  it('should not update user password, password required!', (done) => {
    router()
      .post(process.env.TEST_URL)
      .send({ password: user.noPassword, passwordConfirm: user.password0 })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not send a password reset to a user, email does not exit in our system', (done) => {
    router()
      .post('/api/v1/auth/reset-link')
      .send({ email: user.email })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(404);
        done();
      });
  });

  it('should not send a password reset link to a user, email is not verified.', (done) => {
    router()
      .post('/api/v1/auth/reset-link')
      .send({ email: user.emailFail })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(400);
        done();
      });
  });

  it('should get password reset page', (done) => {
    request(app).get(process.env.TEST_URL)
      .expect(302)
      .end((err, res) => {
        expect(res).to.have.status(302);
        done();
      });
  });
});
