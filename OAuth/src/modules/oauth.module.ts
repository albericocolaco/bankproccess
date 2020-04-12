import { Request, Response, NextFunction } from "express";
import { OAuthResponseModel } from "../model/oauth.response.model";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";
import { environment } from "../environments/environment";
import UserRepository from "../repository/user.repository";

export class OAuthModule{

    public execute(req: Request, res: Response, next: NextFunction){
        let {username, password} = req.body;
        if (!(username && password)) {
            next(new HttpException({code:'OA0001', httpCode: 401, message: 'Unauthorized'}))
        } else {
            UserRepository.getByDocument(username).then(user => {
                console.log(user)
                let bodyJWT = this.getBodyJWT(password, user)
                if(bodyJWT){
                    var response: OAuthResponseModel = {token: jwt.sign(bodyJWT, environment.privateKeyJWT, { expiresIn:  environment.jwtExpiresIn })}
                    res.send(response);
                } else {
                    next(new HttpException({code:'OA0002', httpCode: 403, message: 'Invalid'}))
                }
            }).catch(err => {
                next(new HttpException({code:'OA0003', httpCode: 403, message: 'Invalid'}, err))
            });
        }
    }


    private getBodyJWT(password: any, dbResult: any) {
        if(password === dbResult.password){
            return {
                id: dbResult._id,
                name: dbResult.name,
                loginDate: new Date()
            }
        } else {
            return null;
        }
    }

}