const supertest = require('supertest');
const mongoose = require('mongoose');
const { createUser } = require('./user.service');

const app = require('../../app');
const connectDB = require('../../config/database');
const users = require('./user.model');

const request = supertest(app);

describe('User Endpoint', () => {
  beforeAll(async () => {
    await connectDB();
    await createUser({
      firstName: 'prueba',
      lastName: 'test',
      email: 'pruebauser@test.com',
      password: 'A123456',
    });
  });
  afterAll(async () => {
    await users.deleteMany();
    await mongoose.connection.close();
  });

  describe('get all users', () => {
    it('should response with a 201 status code', async () => {
      const res = await request.get('/api/users/');
      expect(res.statusCode).toEqual(200);
    });
    it('should respond with an array of users GET', async () => {
      const res = await request.get('/api/users');
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('get one users', () => {
    it('should response with a 201 status code', async () => {
      const res = await request.get('/api/users/');
      const userId = res.body[0]._id;
      const getOneUser = await request.get(`/api/users/${userId}`);
      expect(getOneUser.statusCode).toEqual(200);
    });
    it('should respond with an array', async () => {
      const res = await request.get('/api/users');
      const userId = res.body[0]._id;
      const respond = await request.get(`/api/users/${userId}`);

      expect(respond.body).toEqual(
        expect.objectContaining({
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          password: expect.any(String),
        }),
      );
    });
  });

  describe('create a user', () => {
    it('should respond with a 404 status code POST', async () => {
      const res = await request.post('/api/users').send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('update a user ', () => {
    it('should respond with a 200 status code PACTH', async () => {
      const user = {
        firstName: 'updated name',
      };
      const res = await request.get('/api/users');
      const userId = res.body[0]._id;
      const respond = await request.patch(`/api/users/${userId}`).send(user);
      expect(respond.statusCode).toEqual(200);
    });

    it('should respond with a user updated', async () => {
      const user = {
        firstName: 'updated name2',
      };
      const res = await request.get('/api/users');
      const userId = res.body[0]._id;
      const respond = await request.patch(`/api/users/${userId}`).send(user);
      expect(respond.body).toBeInstanceOf(Object);
    });

    it('should respond with a 404 status code if search for id PACTH', async () => {
      const id = '62461f4e8fpoiu';
      const user = {
        firstName: 'vicente',
      };
      const res = await request.patch(`/api/users/${id}`).send(user);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('delete a user', () => {
    it('should respond with a 200 status code', async () => {
      const res = await request.get('/api/users');
      const userId = res.body[0]._id;
      const response = await request.delete(`/api/users/${userId}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('should respond with a 404 status code', async () => {
      const id = '62461f4e8fpoiu';
      const res = await request.get(`/api/users/${id}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});
