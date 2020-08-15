import {Document} from "mongoose";
import {MovieDetails} from "./MovieDetails";

export interface Movie {
    _id: string,
    title: string,
    year: number,
    details?: MovieDetails
}

export interface MovieDocument extends Document {

}
