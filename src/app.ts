import {validateEnv} from "./utilities/validateEnv";
import bodyParser from "body-parser";
import cors from "cors"
import express from "express";
import {MoviesController} from "./controllers/MoviesController";
import {ControllerInterface} from "./controllers/ControllerInterface";

require('dotenv').config()

class App {
    public app: express.Application;

    constructor(controllers: ControllerInterface[]) {
        this.app = express();

        this.loadConfig();
        this.initMiddleware();
        this.initControllers(controllers);
    }

    private loadConfig() {
        validateEnv();
        const env = process.env.NODE_ENV || "development";
        console.log(`[APP] Loaded ${env} environment!`)

        if (env === "development") {
            require('dotenv').config({path: ".env"});
        } else if (env === "production") {
            require('dotenv').config({path: ".env.prod"});
        }
    }

    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private initControllers(controllers: ControllerInterface[]) {
        controllers.forEach((controller) => {
            this.app.use(`/api/v1${controller.route}`, controller.router)
        })
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`[APP] Running on port ${process.env.PORT}`);
        });
    }
}

const app: App = new App([
    new MoviesController,
]);

app.listen()