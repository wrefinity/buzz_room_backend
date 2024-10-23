import express from 'express';
import TaskRepo from '../controllers/task';
import { Router } from "express";
import { Authorize } from "../middlewares/authorize";
// import upload from "../../configs/multer";
// import { uploadToCloudinary } from "../../middlewares/multerCloudinary";

class TaskRouter {
    public router: Router;
    authenticateService: Authorize

    constructor() {
        this.router = Router()
        this.authenticateService = new Authorize()
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post('/tasks', TaskRepo.createTask); // Create
        this.router.get('/tasks', TaskRepo.getTasks); // Read all
        this.router.get('/tasks/:id', TaskRepo.getTaskById); // Read by ID
        this.router.put('/tasks/:id', TaskRepo.updateTask); // Update
        this.router.delete('/tasks/:id', TaskRepo.deleteTask); // Delete

    }
}

export default new TaskRouter().router