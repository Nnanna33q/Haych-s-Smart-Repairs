var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'node:fs';
import path from "node:path";
let html = fs.readFileSync(path.resolve(import.meta.dirname + '../../../contact.html'), { encoding: 'utf-8' });
export default function sendMail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, phone, email, message } = req.body;
            html = html.replace('{{fullName}}', fullName)
                .replace('{{phone}}', phone)
                .replace('{{email}}', email)
                .replace('{{message}}', message);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            yield transporter.sendMail({
                from: `Haych's Smart Repairs <${process.env.EMAIL_USERNAME}>`,
                to: process.env.OWNER_EMAIL_ADDRESS,
                subject: 'New Smart Repair Enquiry',
                html
            });
            res.status(201).json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred',
            });
        }
    });
}
