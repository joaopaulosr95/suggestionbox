import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/httpException';

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log(`[ERROR] ${error.status} ${error.message}`);
    response.status(status).send({
        error: message,
        data: {}
    });
};

export default errorMiddleware;