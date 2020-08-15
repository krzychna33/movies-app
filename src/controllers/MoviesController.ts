import {Router, Request, Response} from "express";
import {ControllerInterface} from "./ControllerInterface";

export class MoviesController implements ControllerInterface {
    public router: Router = Router();
    public route = "/movies";

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.getMovies);
        this.router.post("/", this.postMovies);
    }

    private getMovies = (req: Request, res: Response) => {
        res.send("GET MOVIES");
    }

    private postMovies = (req: Request, res: Response) => {
        res.send("POST MOVIES");
    }
}