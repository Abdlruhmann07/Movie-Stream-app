const mongoose = require('mongoose');

const Movie_schema = mongoose.Schema({

    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: Date,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
})

const Movie = mongoose.model("Movie", Movie_schema)
module.exports = Movie;