import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api/image endpoint', async () => {
        const response = await request.get('/api/image');
        expect(response.status).toBe(200);
    }
)})

describe('Test sending request without parameters', () => {
    it('get missing inputs massege displayed', async () => {
        const response = await request.get('/api/image');
        expect(response.text).toBe("missing inputs");
    }
)});

describe('Test sending request with appropriate parameters', () => {
    it('get image displayed displayed', async () => {
        const response = await request.get('/api/image?image=test.jpg&width=300&height=150');
        expect(response.header['content-type'].includes('image')).toBe(true);
    }
)});