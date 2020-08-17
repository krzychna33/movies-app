import MovieModel from "../../entities/Movie/MovieModel";
import mongoose from "mongoose";
import {IMovie} from "../../entities/Movie/MovieInterface";
import {IMovieDetails} from "../../entities/Movie/MovieDetails";

const {ObjectId} = mongoose.Types;

const movieOneId = new ObjectId();
const movieTwoId = new ObjectId();

const emptyDetails: IMovieDetails = {
    runtime: undefined,
    genre: undefined,
    director: undefined,
    plot: undefined,
    awards: undefined,
    imdbRating: undefined,
}
export const movies: IMovie[] = [
    {
        _id: movieOneId.toString(),
        title: "Dummy movie 1",
        year: 2001,
        details: {
            ...emptyDetails
        }
    },
    {
        _id: movieTwoId.toString(),
        title: "Dummy movie 2",
        year: 2002,
        details: {
            ...emptyDetails
        }
    }
]

export const pushMoviesToDb = (done: Mocha.Done) => {
    MovieModel.deleteMany({}).then(() => {
        const movie1 = new MovieModel(movies[0]).save();
        const movie2 = new MovieModel(movies[1]).save();
        return Promise.all([movie1, movie2]);
    }).then(() => {
        done();
    })
}