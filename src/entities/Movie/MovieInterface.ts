import {Document, Model} from "mongoose";
import {IMovieDetails} from "./MovieDetails";

export interface IMovie {
    _id: any,
    title: string,
    year: number,
    details: IMovieDetails
}

export interface IMovieDocument extends IMovie, Document {
    _doc: IMovie
}

export interface IMovieModel extends Model<IMovieDocument> {

}