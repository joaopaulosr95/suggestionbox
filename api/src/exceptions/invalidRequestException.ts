import HttpException from "./httpException";

export default class InvalidRequestExpception extends HttpException {
    constructor(message: string) {
        super(400, message || 'Invalid request');
    }
}