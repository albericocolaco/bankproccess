import { logger } from "../middlewares/logger.middleware"
import { ErrorModel } from "../model/error.model"


class HttpException extends Error {
    status: number
    code: string
    message: string

    constructor(errorModel: ErrorModel, error?: any){
        super(errorModel.message)
        this.status = errorModel.httpCode
        this.message = errorModel.message
        this.code = errorModel.code
        logger.error(`${this.code}: ${this.message}`, error ? error : '')
    }
}

export default HttpException