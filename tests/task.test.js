const supertest = require('supertest');
const app = require('../api');
const { connect } = require('./database');
const UserModel = require('../models/user.model');

describe('Task routes', () => {
  let token;
  let connection;

  beforeAll(async () => {
    connection = await connect();
  });

  beforeEach(async () => {
    const user = await UserModel.create({
      first_name: 'Drew',
      last_name: 'Osei',
      user_name: 'nanadrew',
      password: 'password',
    });
    // user login
    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .set('content-type', 'application/json')
      .send({
        user_name: 'nanadrew',
        password: 'password',
      });
    token = response.body.token;
  });

  afterEach(async () => {
    await connection.cleanup();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('should return a list of tasks', async () => {
    const response = await supertest(app)
      .get('/api/v1/tasks')
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      tasks: expect.any(Array),
    });
  });

  it('should add a task', async () => {
    const response = await supertest(app)
      .post('/api/v1/tasks')
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        name: 'Task 1',
      });

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      task: expect.any(Object),
    });
  });

  it('should update a task', async () => {
    const task = await supertest(app)
      .post('/api/v1/tasks')
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        name: 'Task 1',
      });

    const response = await supertest(app)
      .patch(`/api/v1/tasks/${task.body.task._id}`)
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        status: 'completed',
      });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      message: 'Update successful',
      updatedTask: expect.any(Object),
    });
  });

  it('should delete a task', async () => {
    const task = await supertest(app)
      .post('/api/v1/tasks')
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        name: 'Task 1',
      });

    const response = await supertest(app)
      .delete(`/api/v1/tasks/${task.body.task._id}`)
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      message: 'delete successful',
    });
  });
});
