import AuthRepo from '../controllers/auth';
import { Router } from "express";

class AuthRouter {
    public router: Router;


    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/register', AuthRepo.createUser);
        this.router.post('/verify', AuthRepo.verifyaccount);
        this.router.post('/login', AuthRepo.login);

    }
}

export default new AuthRouter().router