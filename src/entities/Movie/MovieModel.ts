import mongoose, {Schema, Document} from "mongoose";
import {Movie} from "./MovieInterface";

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
        type: String,
        required: true
    },
    details: movieDetailsSchema
});

const MovieModel = mongoose.model<Movie>('Movie', movieSchema);

export default MovieModel;