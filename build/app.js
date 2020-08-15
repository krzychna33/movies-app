"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validateEnv_1 = require("./utilities/validateEnv");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var MoviesController_1 = require("./controllers/MoviesController");
require('dotenv').config();
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express_1.default();
        this.loadConfig();
        this.initMiddleware();
        this.initControllers(controllers);
    }
    App.prototype.loadConfig = function () {
        validateEnv_1.validateEnv();
        var env = process.env.NODE_ENV;
        console.log("[APP] Loaded " + env + " environment!");
        if (env === "development") {
            require('dotenv').config({ path: ".env" });
        }
        else if (env === "production") {
            require('dotenv').config({ path: ".env.prod" });
        }
    };
    App.prototype.initMiddleware = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
    };
    App.prototype.initControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use(controller.route, controller.controller.router);
        });
    };
    App.prototype.listen = function () {
        this.app.listen(process.env.PORT, function () {
            console.log("[APP] Running on port " + process.env.PORT);
        });
    };
    return App;
}());
var app = new App([
    {
        route: "/movies",
        controller: new MoviesController_1.MoviesController
    }
]);
app.listen();
