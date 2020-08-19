import {Router} from "express";


export interface IControllerInterface {
    route: string,
    router: Router,
}