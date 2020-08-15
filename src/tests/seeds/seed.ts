import MovieModel from "../../entities/Movie/MovieModel";
import mongoose from "mongoose";
import {Movie} from "../../entities/Movie/MovieInterface";
const {ObjectId} = mongoose.Types;

const movieOneId = new ObjectId();
const movieTwoId = new ObjectId();

export const movies: Movie[] = [
    {
        _id: movieOneId.toString(),
        title: "Dummy movie 1",
        year: 2001
    },
    {
        _id: movieTwoId.toString(),
        title: "Dummy movie 2",
        year: 2002
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