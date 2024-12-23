import cookieParser from 'cookie-parser';
import express, { Express } from "express";
import mongoose from "mongoose";
import session from "express-session";
import { APP_SECRET, MONGODB_DB_URI, MONGODB_URI, PORT } from "./secrets";
import { MongoClient, ServerApiVersion } from "mongodb";

import TaskRouter from "./routes/tasks.route";
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/users.route";
import NotificationRouter from "./routes/notification.route";
import BankRouter from "./routes/bank.route";
import passport from 'passport';

import "./configs/googleAuth"



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

    // Using mogo Atlas, but it's not working with the findOne and Insert command it times out
    // private connectDB() {
    //     const client = new MongoClient(MONGODB_DB_URI, {
    //         serverApi: {
    //           version: ServerApiVersion.v1,
    //           strict: true,
    //           deprecationErrors: true,
    //         }
    //       });

    //       async function run() {
    //         try {
    //           await client.connect();
    //           // Send a ping to confirm a successful connection
    //           await client.db("admin").command({ ping: 1 });
    //           console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //         } finally {
    //           // Ensures that the client will close when you finish/error
    //           await client.close();
    //         }
    //       }
    //       run().catch(console.dir);
    // }

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
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private configureRoutes() {
      
        this.app.get("/", (req, res) => res.json({ message: "welcome to buzz room" }));
        this.app.use("/api/task/", TaskRouter);
        this.app.use("/api/auth/", AuthRouter);
        this.app.use("/api/users/", UserRouter);
        this.app.use("/api/notifications/", NotificationRouter);
        this.app.use("/api/bank/", BankRouter);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const server = new Server(Number(PORT), APP_SECRET);
server.start();