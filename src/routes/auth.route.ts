import AuthRepo from '../controllers/auth';
import { Router } from "express";
import passport from 'passport';

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


        this.router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
        this.router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            res.send('Logged in successfully')
        })
    }
}

export default new AuthRouter().router