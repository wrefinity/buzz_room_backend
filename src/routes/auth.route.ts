import express from 'express';
import AuthRepo from '../controllers/auth';
import { Router } from "express";
import { Authorize } from "../middlewares/authorize";
import passport from 'passport';

class AuthRouter {
    public router: Router;
    authenticateService: Authorize

    constructor() {
        this.router = Router()
        this.authenticateService = new Authorize() 
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post('/users', AuthRepo.createUser);
        this.router.get('/users', AuthRepo.getUsers);
        this.router.get('/users/:id', AuthRepo.getUserById); // Read by ID
        this.router.put('/users/:id', AuthRepo.updateUser); // Update
        this.router.delete('/users/:id', AuthRepo.deleteUser); // Delete
        this.router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
        this.router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            res.send('Logged in successfully')
        })
    }
}

export default new AuthRouter().router