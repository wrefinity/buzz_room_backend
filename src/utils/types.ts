
import { Request } from 'express';

export type JWTPayload = {
    id: string;
    role: string | string[];
    email: string;
}

export interface CustomRequest extends Request {
    user: JWTPayload;
    files: {
        [fieldname: string]: Express.Multer.File[];
    };
    params:{
        [key:string]: string;
    }
}


export interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
}




