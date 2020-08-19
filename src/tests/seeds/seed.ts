import MovieModel from "../../entities/Movie/MovieModel";
import mongoose from "mongoose";
import {IMovie} from "../../entities/Movie/MovieInterface";
import {IMovieDetails} from "../../entities/Movie/MovieDetails";
import {IComment} from "../../entities/Comment/CommentInterface";
import CommentModel from "../../entities/Comment/CommentModel";

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
};


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

const commentOneId = new ObjectId();
const commentTwoId = new ObjectId();

export const comments: IComment[] = [
    {
        _id: commentOneId.toString(),
        email: "example1@example.com",
        body: "Lorem ipsum 1",
        movieId: movieOneId.toString(),
        date: new Date().toISOString()
    },
    {
        _id: commentTwoId.toString(),
        email: "example2@example.com",
        body: "Lorem ipsum 2",
        movieId: movieOneId.toString(),
        date: new Date().toISOString()
    }
]

export const pushMoviesToDb = (done: Mocha.Done) => {
    MovieModel.deleteMany({}).then(() => {
        const movie1 = new MovieModel(movies[0]).save();
        const movie2 = new MovieModel(movies[1]).save();
        return Promise.all([movie1, movie2]);
    }).then(() => {
        done();
    });
};

export const pushCommentsToDb = (done: Mocha.Done) => {
    CommentModel.deleteMany({}).then(() => {
        const comment1 = new CommentModel(comments[0]).save();
        const comment2 = new CommentModel(comments[1]).save();

        return Promise.all([comment1, comment2]);
    }).then(() => {
        done();
    });
}