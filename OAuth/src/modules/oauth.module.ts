import { Request, Response, NextFunction } from "express";
import { OAuthResponseModel } from "../model/oauth.response.model";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";

export class OAuthModule{

    public execute(req: Request, res: Response, next: NextFunction){
        let {username, password} = req.body;
        if (!(username && password)) {
            next(new HttpException({code:'0001', httpCode: 401, message: 'Unauthorized'}))
        } else {
            const user = this.mockUserRepository(username, password)
            if (user) {
                var response: OAuthResponseModel = {token: jwt.sign(user, 'teste123', { expiresIn:  '1h' })}
                res.send(response)
            } else {
                next(new HttpException({code:'0002', httpCode: 403, message: 'Invalid'}))
            }
        }
    }


    private mockUserRepository(username: any, password: any) {
        const userPass: String = username.concat(':').concat(password)
        const correctPass: String = 'admin:123456'

        switch (userPass) {
            case correctPass: {
                return {
                    fullName: 'Admin da silva',
                    firstName: 'Admin',
                    roles: ['ADM_ACCESS'],
                    loginDate: new Date()
                }
            }
            default:{
                return null;
            }
        }
    }

}