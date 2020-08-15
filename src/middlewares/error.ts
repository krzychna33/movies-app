import {NextFunction, Request, Response} from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Oops! Something went wrong!";
    const details = error.details && error.details.length > 0 ? error.details : [];

    res.status(status).send({
        status,
        message,
        details
    })
}

export default errorMiddleware;