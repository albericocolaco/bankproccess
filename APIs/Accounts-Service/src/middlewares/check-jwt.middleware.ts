import { Request, Response, NextFunction } from "express"
import { logger } from "./logger.middleware";
import { HttpMessage } from "../utils/http-message";
import * as jwt from 'jsonwebtoken';
import { environment } from "../environments/environment";

export const checkJWT = (apiRoles?: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let TOKEN: string = <string>req.headers['authorization'];
        const BEARER = 'Bearer ';
        //Validate If Token exist
        if (TOKEN && TOKEN.includes(BEARER)) {
            TOKEN = TOKEN.replace(BEARER, '');
        } else {
            logger.error({message: HttpMessage.FORBIDDEN})
            res.status(HttpMessage.FORBIDDEN.httpCode).send({code: HttpMessage.FORBIDDEN.code, message: HttpMessage.FORBIDDEN.message});
            return;
        }

        //Validate if token is valid
        let jwtPayload;
        try { //Valid
            jwtPayload = <any>jwt.verify(TOKEN, environment.privateKeyJWT);
            res.locals.jwtPayload = jwtPayload;
            logger.info({message: 'Success permission', data: jwtPayload});
            next();
        } catch (err) { //Invalid
            logger.error({message: HttpMessage.UNAUTHORIZED, data: err});
            res.status(HttpMessage.UNAUTHORIZED.httpCode).send({code: HttpMessage.UNAUTHORIZED.code, message: HttpMessage.UNAUTHORIZED.message});
        }

    }
}