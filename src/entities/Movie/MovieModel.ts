import mongoose, {Schema} from "mongoose";
import {Movie, MovieDocument} from "./MovieInterface";

const movieDetailsSchema = new Schema({
    runtime: {
        type: String
    },
    genre: {
        type: String
    },
    director: {
        type: String
    },
    plot: {
        type: String
    },
    awards: {
        type: String
    },
    imdbRating: {
        type: String
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
    details: movieDetailsSchema
});

const MovieModel = mongoose.model<MovieDocument>('Movie', movieSchema);

export default MovieModel;