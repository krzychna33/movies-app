import {Router} from "express";


export interface ControllerInterface {
    route: string,
    router: Router,
}