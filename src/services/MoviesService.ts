import AddMovieDto from "../entities/Movie/AddMovieDto";
import MovieModel from "../entities/Movie/MovieModel";
import {AppError} from "../utilities/AppError";
import axios from "axios";
import mongoose from "mongoose";
import {IMovieDetails} from "../entities/Movie/MovieDetails";
import {IMovieDocument} from "../entities/Movie/MovieInterface";

const {ObjectId} = mongoose.Types;

class MoviesService {

    public addNewMovie = async (body: AddMovieDto): Promise<IMovieDocument> => {
        let movieDetails;

        try {
            movieDetails = await this.getMovieData(body.title, body.year);
        } catch (e) {
            movieDetails = {};
        }

        const movie = new MovieModel({
            ...body,
            details: movieDetails
        });

        try {
            return await movie.save();
        } catch (e) {
            throw new AppError(e.message, e.status);
        }

    }

    public getMovieData = (title: string, year: number): Promise<IMovieDetails | {}> => {
        return new Promise<IMovieDetails | {}>((resolve, reject) => {
            axios.get(`${process.env.OMDB_API_URL}?t=${title}&y=${year}&apiKey=${process.env.OMDB_API_KEY}`)
                .then(response => {
                    if (response.status === 200 && response.data.Response === "True") {
                        const {Runtime, Genre, Director, Plot, Awards, Ratings} = response.data;
                        let imdbRating = "n/a";

                        const ratingArray = Ratings.filter((rating: { Source: string, Value: string }) => {
                            if (rating.Source === "Internet Movie Database") {
                                return rating;
                            }
                        });

                        if (ratingArray.length > 0) {
                            imdbRating = ratingArray[0].Value;
                        }

                        resolve({
                            runtime: Runtime,
                            genre: Genre,
                            director: Director,
                            plot: Plot,
                            awards: Awards,
                            imdbRating
                        })
                    } else {
                        resolve({})
                    }
                })
                .catch((e) => {
                    reject({message: "External api error"});
                })
        })
    }

    getAllMovies = async (): Promise<IMovieDocument[]> => {
        try {
            return MovieModel.find();
        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }

    getMovie = async (id: string): Promise<IMovieDocument> => {
        if (!ObjectId.isValid(id)) {
            throw new AppError("Invalid id", 400);
        }

        try {
            const movie = await MovieModel.findOne({_id: id});
            if (!movie) {
                throw new AppError(`Movie with id ${id} not found!`, 404)
            }
            return movie;
        } catch (e) {
            throw new AppError(e.message, e.status);
        }
    }
}

export default MoviesService;