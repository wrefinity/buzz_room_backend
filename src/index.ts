import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import mongoose from "mongoose";
import session from "express-session";
import { APP_SECRET, MONGODB_URI, PORT } from "./secrets";

import TaskRouter from "./routes/tasks.route";
import AuthRouter from "./routes/auth.route";



class Server {
    private app: Express;
    private port: number;
    private appSecret: string;

    constructor(port: number, secret: string) {
        this.app = express();
        this.port = port;
        this.appSecret = secret;
        this.connectDB()
        this.configureMiddlewares();
        this.configureRoutes();
    }

    private connectDB (){
        mongoose.connect(MONGODB_URI, {autoIndex:true})
        .then(() => {
            console.log('Database Connected')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    private configureMiddlewares() {
        // middlewares here
        this.app.use(express.json()); // for content-body parameters
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: this.appSecret,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(cookieParser());
    }

    private configureRoutes() {
      
        this.app.get("/", (req, res) => res.json({ message: "welcome to buzz room" }));
        this.app.use("/api/task/", TaskRouter);
        this.app.use("/api/auth/", AuthRouter);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const server = new Server(Number(PORT), APP_SECRET);
server.start();