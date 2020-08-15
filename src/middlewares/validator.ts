import {plainToClass} from "class-transformer";
import {validate, ValidationError} from "class-validator";
import * as express from "express";
import HttpException from "../exceptions/HttpException";

function validatorMiddleware<T>(type: any): express.RequestHandler {
    return (req, res, next) => {
        const {body} = req;
        const createdClass = plainToClass(type, body);
        validate(createdClass)
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const messagesArray: string[] = [];
                    errors.forEach((error) => {
                        for (let key in error.constraints) {
                            messagesArray.push(error.constraints[key])
                        }
                    })
                    next(new HttpException(400, "Validation error!", messagesArray))
                } else {
                    next();
                }
            })
    }
}

export default validatorMiddleware;