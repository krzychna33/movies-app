import {Document} from "mongoose";
import {MovieDetails} from "./MovieDetails";

export interface Movie extends Document {
    _id: string,
    title: string,
    year: string,
    details?: MovieDetails
}
