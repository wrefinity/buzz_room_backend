import BankRepo from '../controllers/bank';
import { Router } from "express";
import { Authorize } from "../middlewares/authorize";

class AuthRouter {
    public router: Router;
    authenticateService: Authorize

    constructor() {
        this.router = Router()
        this.authenticateService = new Authorize()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/', BankRepo.createBank);
        this.router.get('/', BankRepo.getBanks);
        this.router.get('/:id', BankRepo.getBankById);
        this.router.patch('/:id', BankRepo.updateBank);
        this.router.delete('/:id', BankRepo.deleteBank);

    }
}

export default new AuthRouter().router