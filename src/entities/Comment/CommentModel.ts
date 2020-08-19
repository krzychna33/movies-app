import mongoose, {Schema} from "mongoose";
import {ICommentDocument, ICommentModel} from "./CommentInterface";
import MovieModel from "../Movie/MovieModel";
import {AppError} from "../../utilities/AppError";

const {ObjectId} = mongoose.Types;

const CommentSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        maxlength: 1000
    },
    date: {
        type: Date,
        required: true
    },
    movieId: {
        type: ObjectId,
        required: true
    }
});

CommentSchema.methods.getAssociatedMovie = async function() {
    const {movieId} = this;

    const movie = await MovieModel.findOne({_id: movieId});

    if (!movie) {
        throw new AppError("Not found associated movie", 400);
    }

    return {
        title: movie.title,
        year: movie.year
    }
}

const CommentModel = mongoose.model<ICommentDocument, ICommentModel>("Comment", CommentSchema);

export default CommentModel;
