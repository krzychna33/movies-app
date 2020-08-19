export class AppError extends Error {

    public readonly message: string;
    public readonly status: number;
    public readonly errors?: any;

    constructor(message: string, status: number, errors: any = {}) {
        super(message);
        this.message = message;
        this.status = status ? status : 500;
        this.errors = errors;
    }
}