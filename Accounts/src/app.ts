import * as bodyParser from 'body-parser';
import * as pjson from './../package.json';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthcheck from 'healthcheck-middleware';
import errorMiddleware from './middlewares/error.middleware';
import oauthRouter from './routers/account.router';


class App {

    public express;
    private path = '/api/v1/';
    private healthCheck = healthcheck({
        healthInfo: function(passInfo){
            return {
                name: pjson.name,
                version: pjson.version,
                infor: passInfo
            }
        }
    });

    private routers: Array<express.Router> = [
        oauthRouter
    ];

    constructor(){
        this.express = express();
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use('/health', this.healthCheck);
        this.express.use(this.path, this.routers);
        this.express.use(errorMiddleware);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.express.listen(
                port,
                () => {
                    resolve(port)
                })
                .on('error', (err: object) => reject(err))
        })
    }

}

export default App;