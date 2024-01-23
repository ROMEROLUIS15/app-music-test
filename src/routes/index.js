const express = require('express');
const albumRouter = require('./album.router');
const artistRouter = require('./artist.router');
const genreRouter = require('./genre.router');
const songRouter = require('./song.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/artists', artistRouter);
router.use('/albums', albumRouter);
router.use('/songs', songRouter);

module.exports = router;
