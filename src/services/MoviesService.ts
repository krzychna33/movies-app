import AddMovieDto from "../entities/Movie/AddMovieDto";
import MovieModel from "../entities/Movie/MovieModel";
import {AppError} from "../utilities/AppError";
import axios from "axios";
import {MovieDetails} from "../entities/Movie/MovieDetails";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;

class MoviesService {

    public addNewMovie = async (body: AddMovieDto) => {
        let movieDetails;

        try {
            movieDetails = await this.getMovieData(body.title, body.year);
        } catch (e) {
            throw new AppError(e.message, 500);
        }

        const movie = new MovieModel({
            ...body,
            details: movieDetails
        });

        try {
            return await movie.save();
        } catch (e) {
            throw new AppError(e.message, 500);
        }

    }

    public getMovieData = (title: string, year: number): Promise<MovieDetails | null> => {
        return new Promise<MovieDetails | null>((resolve, reject) => {
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
                        resolve()
                    }
                })
                .catch(() => {
                    reject({message: "External api error"});
                })
        })
    }

    getAllMovies = async () => {
        try {
            return MovieModel.find();
        } catch (e) {
            throw new AppError(e.message, 500);
        }
    }

    getMovie = async (id: string) => {
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
            throw new AppError(e.message, 500);
        }
    }
}

export default MoviesService;