import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/http.exception";


function errorMiddleware (error: HttpException, req: Request, res: Response, next: NextFunction){
    const status = error.status || 500
    const code = error.code || '0000'
    const message = error.message || 'Something went wrong'
    res.status(status).send({code, message})
}

export default errorMiddleware