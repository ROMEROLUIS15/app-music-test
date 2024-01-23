const app = require('../app');
const request = require('supertest');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /artists should bring all the artists', async () => {
  const res = await request(app).get('/artists');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /artists should add artist', async () => {
  const artist = {
    name: 'Metallica',
    formationYear: 1979,
    country: 'United States',
    image: 'https://imagenes.elpais.com/resizer/o98y6belT-pBEgJQNLy859MuqTg=/1200x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/5IVSQSEC6NEKZDAMTPSL6GL7XM.jpg'
  }
  const res = await request(app).post('/artists').send(artist);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(artist.name);
});

test('PUT /artists/:id should update artist', async () => {
  const artist = {
    name: 'Metallica update',
  }
  const res = await request(app).put(`/artists/${id}`).send(artist);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(artist.name);
});

test('POST /artist/:id/genres should insert the genres of an artist', async () => {
  const genre = await Genre.create({
    name: 'Jazz',
  });
  const res = await request(app)
    .post(`/artists/${id}/genres`)
    .send([ genre.id ]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('DELETE /artists/:id should delete an artist', async () => {
  const res = await request(app).delete(`/artists/${id}`)
  expect(res.status).toBe(204);
});
