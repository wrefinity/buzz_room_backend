import NotificationRepo from '../controllers/notification';
import { Router } from "express";
import { Authorize } from "../middlewares/authorize";


class NotificationRouter {
    public router: Router;
    authenticateService: Authorize

    constructor() {
        this.router = Router()
        this.authenticateService = new Authorize()
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post('/', NotificationRepo.createNotification); // Create
        this.router.get('/', NotificationRepo.getNotifications); // Read all
        this.router.put('/:notificationId', NotificationRepo.markAsRead); // Update
    }
}

export default new NotificationRouter().router