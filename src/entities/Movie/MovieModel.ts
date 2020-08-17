import mongoose, {Schema} from "mongoose";
import {IMovieDocument, IMovieModel} from "./MovieInterface";

const movieDetailsSchema = new Schema({
    runtime: {
        type: String,
        default: null
    },
    genre: {
        type: String,
        default: null
    },
    director: {
        type: String,
        default: null
    },
    plot: {
        type: String,
        default: null
    },
    awards: {
        type: String,
        default: null
    },
    imdbRating: {
        type: String,
        default: null
    }
})

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    details: {
        type: movieDetailsSchema,
        required: true
    }
});

const MovieModel = mongoose.model<IMovieDocument, IMovieModel>('Movie', movieSchema);

export default MovieModel;