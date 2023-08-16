const mongoose = require('mongoose');
const order_Schema = mongoose.Schema({
    items: [
        {
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
            vote_count: Number,
            quantity: Number,
        },
    ],
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
        email: String,
    }
})

const Order = mongoose.model("Order", order_Schema);
module.exports = Order;