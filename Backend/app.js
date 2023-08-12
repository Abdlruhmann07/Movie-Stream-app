require('dotenv').config();
//Server requirements
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT
const app = express();

//Importing modules
const Movies = require('./Models/Movies')
const User = require('./Models/Users')

// Current user
const CurrentUser = {
    _id: "64d6500a3afbe856d0ec3a65",
    username: "Dodger",
    email: "dodger@gmail.com",
    // watchlist: {
    //     items: []
    // },

}


// Using important middlewares
app.use(cors()); // Enable CORS for all requests
app.use(bodyparser.urlencoded({ extended: true })); //Parsing request body 
app.use(express.json());


// Database Connect
mongoose.connect(`mongodb+srv://${process.env.Database_username}:${process.env.Database_Passwrod}@cluster0.dgihmg1.mongodb.net/stream-app1`)
    .then(() => {
        console.log("Database Connected!");
    }).catch((err) => {
        `Error connecting to database ${err}`;
    })

// Get All Products Route
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movies.find();
        // console.log(movies);
        res.status(200).json({ movies: movies, totalMovieCount: 20 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})


// waiting for single movie : id
app.get("/movies/:id", async (req, res) => {
    try {
        const movie_id = +req.params.id;
        const selcetedMovie = await Movies.findOne({ id: movie_id });
        if (!selcetedMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        // Respond with the movie
        res.status(200).json(selcetedMovie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Add new User
app.post('/adduser', (req, res) => {
    let userData = req.body;
    let newUser = new User({
        username: userData.username,
        email: userData.email,
        watchlist: {
            items: [],
        },
    });
    newUser.save().then(userdata => {
        console.log(userdata);
        res.json({
            users: userData,
            message: 'User created!'
        })
    }).catch(err => {
        console.log('Error in creating user');
    })

})

// Add to watchlist route
app.post('/addtowatchlist', (req, res) => {
    let movieId_tobeAdded = req.body.movieId
    // console.log(movieId);

    User.findById({ _id: CurrentUser._id }).then((user) => {
        let updatedUserWatchlist = [...user.watchlist.items];
        let newQuantity = 1;
        let watchlistIndex = user.watchlist.items.findIndex((wlM) => {
            return wlM.movieID.toString() == movieId_tobeAdded.toString();
        });
        if (watchlistIndex >= 0) {
            newQuantity = user.watchlist.items[watchlistIndex].quantity + 1;
            updatedUserWatchlist[watchlistIndex].quantity = newQuantity;
        } else {
            updatedUserWatchlist.push({
                movieID: new mongoose.Types.ObjectId(movieId_tobeAdded),
                quantity: newQuantity,
            })
        }
        let User_watchlist = {
            items: updatedUserWatchlist,
        }
        return User.updateOne({ _id: CurrentUser._id }, { $set: { watchlist: User_watchlist } }).then(updatedUser => {
            console.log(updatedUser);
        })

    }).catch(err => {
        console.log(err);
    })
})

// Get wathclist route / page
app.get('/watchlist', (req, res) => {
    let userinfo;
    User.findById({ _id: CurrentUser._id }).then(user => {
        userinfo = user;
        let watchlistMoviesIds = user.watchlist.items.map(item => {
            return item.movieID;
        })
        return Movies.find({ _id: { $in: watchlistMoviesIds } }).then(retrivedMovies => {
            let items = retrivedMovies.map(movie => {
                return {
                    adult: movie.adult,
                    backdrop_path: movie.backdrop_path,
                    genre_ids: movie.genre_ids,
                    id: movie.id,
                    original_language: movie.original_language,
                    original_title: movie.original_title,
                    overview: movie.overview,
                    popularity: movie.popularity,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    title: movie.title,
                    video: movie.video,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,

                    quantity: userinfo.watchlist.items.find(item => {
                        return item.movieID.toString() == movie._id.toString()
                    }).quantity,
                }
            })
            res.json(items)
        })

    }).catch(err => {
        console.log(err);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})