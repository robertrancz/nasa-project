const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {

  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('It should return an array of launches', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});