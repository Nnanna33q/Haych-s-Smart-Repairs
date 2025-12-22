import nodemailer from 'nodemailer';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'node:fs';
import path from "node:path";

let html = fs.readFileSync(path.resolve(import.meta.dirname + '../../../contact.html'), { encoding: 'utf-8' });

export default async function sendMail(req: Request, res: Response, next: NextFunction) {
    try {
        const { fullName, phone, email, message } = req.body;

        html = html.replace('{{fullName}}', fullName)
        .replace('{{phone}}', phone)
        .replace('{{email}}', email)
        .replace('{{message}}', message)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        await transporter.sendMail({
            from: `Haych's Smart Repairs <${process.env.EMAIL_USERNAME}>`,
            to: process.env.OWNER_EMAIL_ADDRESS,
            subject: 'New Smart Repair Enquiry',
            html
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred',
        })
    }
}