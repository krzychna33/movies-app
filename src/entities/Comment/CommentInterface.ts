import {Document, Model} from "mongoose";


export interface IAssociatedMovie {
    title: string,
    year: number
}

export interface IComment {
    _id: any,
    email: string,
    body: string,
    date: string,
    movieId: string,
    associatedMovie?: IAssociatedMovie
}

export interface ICommentDocument extends IComment, Document {
    _doc: IComment,
    getAssociatedMovie: () => IAssociatedMovie
}

export interface ICommentModel extends Model<ICommentDocument> {

}