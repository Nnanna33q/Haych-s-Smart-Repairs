import type { Request } from "express";
import multer from "multer";

export default function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if(!file.mimetype.startsWith('image/')) {
        cb(new Error('Invalid file mimetype'))
    }
    
    if(file.size > 10485760) cb(new Error('File is too large (maximum allowed size is 10 MB)'));

    cb(null, true);

}