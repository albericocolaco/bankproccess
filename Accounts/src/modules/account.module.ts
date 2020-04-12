import { Request, Response, NextFunction } from "express";
import redis from 'redis';
import UserReposotory from "../repository/user.repository";
import { environment } from "../environments/environment";
import { publishToExchange } from "../config/mq.conf";
import HttpException from "../exceptions/http.exception";
import { HttpMessage } from "../utils/http-message";
import { logger } from "../middlewares/logger.middleware";
import { AccountConverter } from "../converters/account.converter";

export class AccountModule{
    private clientRedis
    private accountConverter: AccountConverter;

    constructor(){
        this.clientRedis = redis.createClient();
        this.accountConverter = new AccountConverter();
    }

    public create(req: Request, res: Response, next: NextFunction){
        logger.info({message: 'Start create account'})
        UserReposotory.create(this.accountConverter.bodyToInsertData(req.body))
        .then((user) => {
            logger.info({message: 'User insert in db', data: user})
            publishToExchange('createAccountCard', JSON.stringify(user)).then(success => {
                logger.info({message: 'User send to queue', data: user})
                res.status(HttpMessage.CREATED.httpCode).send({code: HttpMessage.CREATED.code, message: HttpMessage.CREATED.message});
            }).catch(err => {
                logger.error({message: 'User not send to queue', data: {user: user, err: err}})
                res.status(HttpMessage.CREATED_WITH_NOTES.httpCode).send({code: HttpMessage.CREATED_WITH_NOTES.code, message: HttpMessage.CREATED_WITH_NOTES.message});
            });
        }).catch(err => {
            next(new HttpException(HttpMessage.ERROR_INSERT_DATA_IN_DB, err));
        })
    }

    public updatePassword(req: Request, res: Response, next: NextFunction) {
        logger.info({message: 'Start update password', data: res.locals.jwtPayload.id})
        let {newPassword, confirmPassword} = req.body;
        if(newPassword && confirmPassword){
            if(newPassword === confirmPassword){
                UserReposotory.updatePassword(res.locals.jwtPayload.id, newPassword).then( user => {
                    res.status(HttpMessage.UPDATED.httpCode).send({code: HttpMessage.UPDATED.code, message: HttpMessage.UPDATED.message})
                }).catch(err => {
                    next(new HttpException(HttpMessage.ERROR_UPDATE_DATA_IN_DB, err));
                })
            } else {
                next(new HttpException(HttpMessage.VALUES_NOT_EQUALS));
            }
        } else {
            next(new HttpException(HttpMessage.PARAM_REQUIRED));
        }
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        logger.info({message: 'Start delete user', data: res.locals.jwtPayload.id})
        UserReposotory.delete(res.locals.jwtPayload.id).then( user => {
            res.status(HttpMessage.DELETED.httpCode).send({code: HttpMessage.DELETED.code, message: HttpMessage.DELETED.message})
        }).catch(err => {
            next(new HttpException(HttpMessage.DELETED_ERROR, err));
        })
    }

    public find(req: Request, res: Response, next: NextFunction) {
        logger.info({message: 'Start find By id', data: res.locals.jwtPayload.id})
        let vm = this;
        let redisKey = `${environment.redisDefaultConf.userFindByDocument}-${res.locals.jwtPayload.id}`;
        vm.clientRedis.get(redisKey, function (err, reply) {
            if(err){
                logger.error({message: 'REDIS error', data: err})
            }
            if (reply) {
                logger.info({message: 'Result content by REDIS'})
                res.send(JSON.parse(reply))
            } else {
                UserReposotory.getById(res.locals.jwtPayload.id).then( user => {
                    logger.info({message: 'Result content by DB', data: user})
                    if (user) {
                        var userDTO = vm.accountConverter.resultToDTO(user);
                        vm.clientRedis.set(redisKey, JSON.stringify(userDTO));
                        vm.clientRedis.expire(redisKey, environment.redisDefaultConf.time);
                        res.send(userDTO);
                    } else {
                        next(new HttpException(HttpMessage.NOT_CONTENT));
                    }
                }).catch(err => {
                    next(new HttpException(HttpMessage.ERROR_CONSULT_DATA_IN_DB, err));
                })
            }
        })
    }
}