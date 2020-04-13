import { Router, Response, NextFunction, Request } from "express";
import { AccountModule } from "../modules/account.module";
import { checkJWT } from "../middlewares/check-jwt.middleware";

class AccountRouter{

    public router: Router
    private path: String = '/account'
    private module = new AccountModule
    
    constructor(){
        this.router = Router()
        this.init()
    }

    private init(){
        let module = this.module
        this.router.get(`${this.path}`, checkJWT(), (req: Request, res: Response, next: NextFunction) => {
            module.find(req, res, next)
        });
        this.router.post(`${this.path}`, (req: Request, res: Response, next: NextFunction) => {
            module.create(req, res, next)
        });
        this.router.put(`${this.path}/password`, checkJWT(), (req: Request, res: Response, next: NextFunction) => {
            module.updatePassword(req, res, next)
        });
        this.router.delete(`${this.path}`, checkJWT(), (req: Request, res: Response, next: NextFunction) => {
            module.delete(req, res, next)
        });
    }
}

export default new AccountRouter().router;