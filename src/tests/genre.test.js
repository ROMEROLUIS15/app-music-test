const request = require('supertest');
const app = require('../app');
const Artist = require('../models/Artist');
require('../models');

let id;

test("GET /genres should get all genres", async() => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres should add one genre", async () => {
  const newGenre = {
    name: "Rock",
  }
  const res = await request(app).post('/genres').send(newGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newGenre.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /genres/:id should update an genre", async () => {
  const genre = {
    name: "Rock update",
  }
  const res = await request(app).put(`/genres/${id}`).send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
})

test('POST /genres/:id/artists should insert the artists of an genre', async () => {
  const artist = await Artist.create({
    name: 'test 1234',
    formationYear: 2024,
    country: 'test country',
    image: 'test image',
  })
  const res = await request(app)
    .post(`/genres/${id}/artists`)
    .send([ artist.id ]);
  await artist.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /genres/:id should delete an genre", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});

