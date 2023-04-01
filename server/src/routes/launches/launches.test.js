const request = require('supertest');
const sinon = require('sinon');
var authMiddleware, app;
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API tests', () => {

  beforeAll(async () => {
    // Stub out the auth middleware so we can test the launches API
    authMiddleware = require('../../middlewares/require-auth');
    sinon.stub(authMiddleware, 'requireAuth')
      .callsFake((req, res, next) => {
        return next();
      });

    app = require('../../app');

    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/launches', () => {

    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should return an array of launches', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Test POST /v1/launches', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC-1701-D',
      destination: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC-1701-D',
      destination: 'Kepler-62 f',
    };

    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC-1701-D',
      destination: 'Kepler-62 f',
      launchDate: 'invalid',
    };

    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
    
  });
});