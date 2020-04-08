import { Router, Response, NextFunction, Request } from "express";
import { OAuthModule } from "../modules/oauth.module";

class OAuthRouter{

    public router: Router
    private path: String = '/oauth'
    private module = new OAuthModule
    
    constructor(){
        this.router = Router()
        this.init()
    }

    private init(){
        let module = this.module
        this.router.post(`${this.path}`, (req: Request, res: Response, next: NextFunction) => {
            module.execute(req, res, next)
        })
    }
}

export default new OAuthRouter().router;