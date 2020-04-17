import sinon from 'sinon';
import * as chai from 'chai';
import request from 'supertest';
import passport from 'passport';
import sinonChai from 'sinon-chai';
import app from '../index';
import {
  mockData,
  googleProfile,
  facebookProfile,
  noUserNameProfile
} from './mochData/socialMock';
import User from '../middleware/user';
import AuthHelper from '../helpers/authHelper';

chai.use(sinonChai);
chai.should();
const { expect } = chai;

describe('Social authentication tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return user data when it gets the profile from the social account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const callBack = sinon.spy();
    await AuthHelper.socialSignIn(accessToken, refreshToken, googleProfile, callBack);
    expect(callBack.withArgs(null, googleProfile));
  });


  it('should return user data when it gets the profile from the social account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const callBack = sinon.spy();
    await AuthHelper.socialSignIn(accessToken, refreshToken, facebookProfile, callBack);
    expect(callBack.withArgs(null, facebookProfile));
  });

  it('should return user data when it gets the profile, replace username by firstname', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const callBack = sinon.spy();
    await AuthHelper.socialSignIn(accessToken, refreshToken, noUserNameProfile, callBack);
    expect(callBack.withArgs(null, googleProfile));
  });
});


describe('Google Social Sign In Test', () => {
  before(async () => {
    sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
      callback(null, mockData[3], null);
      return () => { };
    });
  });
  after(() => {
    passport.authenticate.restore();
  });
  it('should successfully sign in the user with Google', (done) => {
    request(app).get('/api/v1/auth/google/return')
      .send(mockData[2])
      .expect(200)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});


describe('Facebook Social Sign In Test', () => {
  before(async () => {
    sinon.stub(passport, 'authenticate').callsFake((strategy, options, callback) => {
      callback(null, mockData[3], null);
      return () => { };
    });
  });
  after(() => {
    passport.authenticate.restore();
  });
  it('should successfully sign in the user with Facebook', (done) => {
    request(app).get('/api/v1/auth/facebook/return')
      .send(mockData[2])
      .expect(200)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('should redirect the user to the Google Auth endpoint once not already authenticated', () => {
  it('should call next(error) once', () => {
    const nextSpy = sinon.spy();

    User.verifyGoogleSignIn({}, {}, nextSpy);
    expect(nextSpy.calledOnce).to.equal(true);
  });
});


describe('should redirect the user to the Facebook Auth endpoint once not already authenticated', () => {
  it('should call next(error) once', () => {
    const nextSpy = sinon.spy();

    User.verifyFacebookSignIn({}, {}, nextSpy);
    expect(nextSpy.calledOnce).to.equal(true);
  });
});
