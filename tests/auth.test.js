const supertest = require('supertest');
const app = require('../api');
const { connect } = require('./database');
const UserModel = require('../models/user.model');

describe('User Authentication Test', () => {
  let connection;
  beforeAll(async () => {
    connection = await connect();
  });

  beforeEach(async () => {
    await connection.cleanup();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('should register a user successfully', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/signup')
      .set('content-type', 'application/json')
      .send({
        first_name: 'Drew',
        last_name: 'Osei',
        user_name: 'nanadrew',
        password: 'password',
      });

    expect(response.status).toEqual(201);
    expect(response.body.user).toMatchObject({
      first_name: 'Drew',
      last_name: 'Osei',
      user_name: 'nanadrew',
    });
  });

  // Test case
  it('should successfully login a user', async () => {
    await UserModel.create({
      first_name: 'Drew',
      last_name: 'Osei',
      user_name: 'drewosei',
      password: 'password',
    });

    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .set('content-type', 'application/json')
      .send({
        user_name: 'drewosei',
        password: 'password',
      });

    // expectations
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      message: 'Login successfully',
      token: expect.any(String),
      user: expect.any(Object),
    });

    expect(response.body.user.user_name).toEqual('drewosei');
  });

  it('should not successfully login a user, when user does not exist', async () => {
    await UserModel.create({
      first_name: 'Drew',
      last_name: 'Osei',
      user_name: 'drewosei',
      password: 'password',
    });

    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .set('content-type', 'application/json')
      .send({
        user_name: 'drewose',
        password: 'password',
      });

    // expectations
    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      message: 'User does not exist. Try signing up',
    });
  });
});
