class HttpException extends Error {
    public status: number;
    public message: string;
    public details: string[];

    constructor(status: number, message: string, details: string[] = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.details = details;
    }
}

export default HttpException;