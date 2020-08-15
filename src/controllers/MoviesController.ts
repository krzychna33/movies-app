import {Router, Request, Response, NextFunction} from "express";
import {ControllerInterface} from "./ControllerInterface";
import MoviesService from "../services/MoviesService";
import validatorMiddleware from "../middlewares/validator";
import AddMovieDto from "../entities/Movie/AddMovieDto";
import HttpException from "../exceptions/HttpException";


export class MoviesController implements ControllerInterface {
    public router: Router = Router();
    public route = "/movies";
    private moviesService: MoviesService;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.getMovies);
        this.router.get("/:id", this.getMovie);
        this.router.post("/", validatorMiddleware(AddMovieDto), this.postMovies);
    }

    private getMovies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const movies = await this.moviesService.getAllMovies();
            res.status(200).send({
                results: movies,
                count: movies.length
            });
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors));
        }
    }
    
    private getMovie = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        try {
            const movie = await this.moviesService.getMovie(id);
            res.status(200).send({
                movie
            })
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors));
        }
    }

    private postMovies = async (req: Request, res: Response, next: NextFunction) => {
        const {body} = req;

        try {
            const movie = await this.moviesService.addNewMovie(body);
            res.status(201).send({
                movie
            });
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors))
        }

    }
}