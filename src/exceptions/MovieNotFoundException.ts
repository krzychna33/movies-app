import HttpException from "./HttpException";

class MovieNotFoundException extends HttpException {
    constructor(id: number) {
        super(404, `Movie with id ${id} not found!`);
    }
}

export default MovieNotFoundException;