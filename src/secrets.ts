import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT =  process.env.PORT!;
export const JWT_SECRET =  process.env.JWT_SECRET!;
export const MAIL_HOST = process.env.MAIL_HOST!;
export const MAIL_USERNAME = process.env.MAIL_USERNAME!;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD!;
export const FROM_EMAIL = process.env.FROM_EMAIL!;
export const APP_SECRET = process.env.APP_SECRET!;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET!;
export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER!;
export const GOOGLE_PROFILE = process.env.GOOGLE_PROFILE!;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const PUBLIC_URL = process.env.PUBLIC_URL!;
export const MONGODB_URI = process.env.MONGODB_URI!;
