"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
var express_1 = require("express");
var MoviesController = /** @class */ (function () {
    function MoviesController() {
        this.router = express_1.Router();
        this.getMovies = function (req, res) {
            res.send("WITAAAAAAM!");
        };
        this.initRoutes();
    }
    MoviesController.prototype.initRoutes = function () {
        this.router.get("/", this.getMovies);
    };
    return MoviesController;
}());
exports.MoviesController = MoviesController;
