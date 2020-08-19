import AddCommentDto from "../entities/Comment/AddCommentDto";
import {
    IComment,
    ICommentDocument,
} from "../entities/Comment/CommentInterface";
import CommentModel from "../entities/Comment/CommentModel";
import {AppError} from "../utilities/AppError";
import mongoose from "mongoose";
import MovieModel from "../entities/Movie/MovieModel";

const {ObjectId} = mongoose.Types;

class CommentsService {

    public addNewComment = async (body: AddCommentDto): Promise<ICommentDocument> => {
        if (!ObjectId.isValid(body.movieId)) {
            throw new AppError("Invalid movie id", 400);
        }

        const associatedMovie = await MovieModel.findOne({_id: body.movieId});

        if (!associatedMovie) {
            throw new AppError("Not found associated movie", 400);
        }

        const comment = new CommentModel({
            ...body,
            date: new Date()
        });

        try {
            return await comment.save();
        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }

    public getComment = async (id: string): Promise<IComment> => {

        if (!ObjectId.isValid(id)) {
            throw new AppError("Invalid id", 400);
        }

        try {
            const comment = await CommentModel.findOne({_id: id});

            if (!comment) {
                throw new AppError(`Comment with id ${id} not found!`, 404)
            }

            const commentEmailSuffix = comment.email.substring(comment.email.length - 6, comment.email.length);
            const commentEmailPrefix = comment.email.substring(0, comment.email.length - 6).replace(/./gi, "*");

            comment.email = commentEmailPrefix + commentEmailSuffix;

            const associatedMovie = await comment.getAssociatedMovie();

            return {
                ...comment._doc,
                associatedMovie
            };

        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }

    public getComments = async (movieId: any) => {

        if (!ObjectId.isValid(movieId)) {
            throw new AppError("Invalid id", 400);
        }

        try {
            return await CommentModel.find({movieId: movieId});
        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }
}

export default CommentsService;