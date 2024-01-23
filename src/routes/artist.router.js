const { getAll, create, getOne, remove, update, setArtistGenres } = require('../controllers/artist.controllers');
const express = require('express');

const artistRouter = express.Router();

artistRouter.route('/')
    .get(getAll)
    .post(create);

artistRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

artistRouter.route('/:id/genres')
    .post(setArtistGenres);

module.exports = artistRouter;