const request = require('supertest');
const app = require('./app');

describe('GET /mean', () => {
    test('it should calculate the mean', async () => {
        const response = await request(app)
            .get('/mean?nums=1,3,5,7')
            .expect(200);
        expect(response.body).toEqual({ operation: 'mean', value: 4 });
    });

    test('it should handle invalid numbers', async () => {
        const response = await request(app)
            .get('/mean?nums=foo,2,3')
            .expect(400);
        expect(response.body).toEqual({ error: 'foo,2,3 is not a number.' });
    });

    test('it should handle empty input', async () => {
        const response = await request(app)
            .get('/mean')
            .expect(400);
        expect(response.body).toEqual({ error: 'nums are required.' });
    });
});

describe('GET /median', () => {
    test('it should calculate the median', async () => {
        const response = await request(app)
            .get('/median?nums=1,3,5,7')
            .expect(200);
        expect(response.body).toEqual({ operation: 'median', value: 4 });
    });

    test('it should handle invalid numbers', async () => {
        const response = await request(app)
            .get('/median?nums=foo,2,3')
            .expect(400);
        expect(response.body).toEqual({ error: 'foo,2,3 is not a number.' });
    });

    test('it should handle empty input', async () => {
        const response = await request(app)
            .get('/median')
            .expect(400);
        expect(response.body).toEqual({ error: 'nums are required.' });
    });
});

describe('GET /mode', () => {
    test('it should calculate the mode', async () => {
        const response = await request(app)
            .get('/mode?nums=1,3,5,3,7')
            .expect(200);
        expect(response.body).toEqual({ operation: 'mode', value: ['3'] });
    });

    test('it should handle invalid numbers', async () => {
        const response = await request(app)
            .get('/mode?nums=foo,2,3')
            .expect(400);
        expect(response.body).toEqual({ error: 'foo,2,3 is not a number.' });
    });

    test('it should handle empty input', async () => {
        const response = await request(app)
            .get('/mode')
            .expect(400);
        expect(response.body).toEqual({ error: 'nums are required.' });
    });
});
