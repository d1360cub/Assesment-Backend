const supertest = require('supertest');
const mongoose = require('mongoose');

const { createUser, getUserByEmail } = require('../user/user.service');
const { signToken } = require('../../auth/auth.service');

const app = require('../../app');
const connectDB = require('../../config/database');
const users = require('../user/user.model');

const request = supertest(app);

let user = '';
let token = '';

describe('Favs Endpoint', () => {
  beforeAll(async () => {
    await connectDB();
    user = await createUser({
      firstName: 'prueba',
      lastName: 'favs',
      email: 'pruebafavs@test.com',
      password: 'A123456',
    });
    token = signToken(user.profile);
  });
  afterAll(async () => {
    await users.deleteMany();
    await mongoose.connection.close();
  });

  describe('Get all favs', () => {
    it('should response with a 200 status code', async () => {
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    });
    it('Should get an array', async () => {
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('Create list of favs', () => {
    it('Shoul respond with a 201 status code', async () => {
      const { _id } = await getUserByEmail('pruebafavs@test.com');
      const newFavs = await request.post('/api/favs').set('authorization', `Bearer ${token}`).send({
        name: 'Prueba crear nueva lista',
        item: [
          {
            title:'test item',
            description:'test description',
            link:'www.google.com'
          }
        ],
        userId: _id,
      });
      expect(newFavs.statusCode).toEqual(201);
    });
  });

  describe('Get one fav', () => {
    it('should response with a 200 status code', async () => {
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      const listId = res.body[0]._id;
      const response = await request.get(`/api/favs/${listId}`).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Update list', () => {
    it('should respond with a 200 status code', async () => {
      const item = {
        title:'added item',
        description:'added description',
        link:'www.duckduckgo.com'
      };
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      const listId = res.body[0]._id;
      const response = await request.patch(`/api/favs/${listId}`).set('authorization', `Bearer ${token}`).send(item);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Delete list', () => {
    it('Should respond with a 200 status code', async () => {
      const res = await request.get('/api/favs').set('authorization', `Bearer ${token}`);
      const listId = res.body[0]._id;
      const response = await request.delete(`/api/favs/${listId}`).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
    });
  });

});

