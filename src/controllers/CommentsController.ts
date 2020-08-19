import {IControllerInterface} from "./ControllerInterface";
import {NextFunction, Request, Response, Router} from "express";
import CommentsService from "../services/CommentsService";
import validatorMiddleware from "../middlewares/validator";
import AddCommentDto from "../entities/Comment/AddCommentDto";
import HttpException from "../exceptions/HttpException";


export class CommentsController implements IControllerInterface {
    public router: Router = Router();
    public route = "/comments";
    private commentsService: CommentsService;

    constructor(commentsService: CommentsService) {
        this.initRoutes();
        this.commentsService = commentsService;
    }

    private initRoutes() {
        this.router.get("/", this.getAllComments);
        this.router.get("/:id", this.getComment);
        this.router.post("/", validatorMiddleware(AddCommentDto), this.postComment);
    }

    private getAllComments = async (req: Request, res: Response, next: NextFunction) => {
        const movieId = req.query.movieId;

        if (!movieId) {
            next(new HttpException(404, 'Movie id not provided'));
        }

        try {
            const comments = await this.commentsService.getComments(movieId);
            res.status(200).send({
                results: comments,
                count: comments.length
            });
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors));
        }
    }

    private getComment = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;

        try {
            const comment = await this.commentsService.getComment(id);
            res.status(200).send({
                comment
            });
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors));
        }
    }

    private postComment = async (req: Request, res: Response, next: NextFunction) => {
        const {body} = req;

        try {
            const comment = await this.commentsService.addNewComment(body);
            res.status(201).send({
                comment
            });
        } catch (e) {
            next(new HttpException(e.status || 500, e.message, e.errors));
        }
    }
}