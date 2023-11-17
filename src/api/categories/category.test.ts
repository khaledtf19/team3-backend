import request from 'supertest';

import app from '../../../src/app';

describe('GET /api/categories', () => {
  it('responds an array of categories', async () => {
    request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((respons) => {
        expect(respons.body).toHaveProperty('length');
        expect(respons.body.length).toBe(9);
        expect(respons.body[0]).toHaveProperty('id');
        expect(respons.body[0]).toHaveProperty('name');
      });
  });
});
describe('GET /api/categories/17c72b2f-ad38-4d38-8e3b-2c193c48b686', () => {
  it('responds a category by ID', async () => {
    request(app)
      .get('/api/categories/17c72b2f-ad38-4d38-8e3b-2c193c48b686')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((respons) => {
        expect(respons.body).toHaveProperty('id');
        expect(respons.body).toHaveProperty('name');
      });
  });
});
describe('POST /api/categories', () => {
  it('responds an error if the category name is invalid', async () => {
    request(app)
      .post('/api/categories')
      .set('Accept', 'application/json')
      .send({
        name: ''
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((respons) => {
        expect(respons.body).toHaveProperty('message');
      });
  });
});
