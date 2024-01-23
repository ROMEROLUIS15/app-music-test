const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const Artist = require('../models/Artist');

const getAll = catchError(async(req, res) => {
    const results = await Genre.findAll({ include: [Artist] });;
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Genre.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Genre.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Genre.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Genre.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// /genres/:id/artists
const setGenreArtists = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    await genre.setArtists(req.body);
    const artists = await genre.getArtists();
    return res.json(artists);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenreArtists,
}