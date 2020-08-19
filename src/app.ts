import bodyParser from "body-parser";
import cors from "cors"
import express from "express";
import mongoose from "mongoose";

import {MoviesController} from "./controllers/MoviesController";
import {IControllerInterface} from "./controllers/ControllerInterface";
import {validateEnv} from "./utilities/validateEnv";
import MoviesService from "./services/MoviesService";
import errorMiddleware from "./middlewares/error";
import {CommentsController} from "./controllers/CommentsController";
import CommentsService from "./services/CommentsService";


class App {
    public app: express.Application;

    constructor(controllers: IControllerInterface[]) {
        this.app = express();

        this.loadConfig();
        this.initMiddleware();
        this.connectWithDatabase();
        this.initControllers(controllers);
        this.initErrorHandlers();
    }

    private loadConfig() {
        validateEnv();
        const env = process.env.NODE_ENV || "development";
        console.log(`[APP] Loaded ${env} environment!`)

        if (env === "development") {
            require('dotenv').config({path: ".env"});
        } else if (env === "production") {
            require('dotenv').config({path: ".env.prod"});
        } else if (env === "test") {
            require('dotenv').config({path: ".env.test"});
        }
    }

    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private connectWithDatabase() {

        mongoose.connect(`${process.env.MONGO_ADDRESS}`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
            .then(() => console.log("[APP] Connected with database ❤️"))
            .catch((e) => console.log(e));
    }

    private initControllers(controllers: IControllerInterface[]) {
        controllers.forEach((controller) => {
            this.app.use(`/api/v1${controller.route}`, controller.router);
        });
    }

    private initErrorHandlers() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`[APP] Running on port ${process.env.PORT}`);
        });
    }
}

export const app: App = new App([
    new MoviesController(new MoviesService()),
    new CommentsController(new CommentsService())
]);

app.listen();