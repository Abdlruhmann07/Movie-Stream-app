const mongoose = require('mongoose');
const User_schema = mongoose.Schema({
    username: String,
    email: String,

    watchlist: {
        items: [
            {
                movieID: mongoose.Types.ObjectId,
                quantity: Number,
            },
        ],
    },

})

const User = mongoose.model("User", User_schema)
module.exports = User;