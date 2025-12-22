import type { Request, Response } from "express";
import cloudinary from "./cloudinary.js";
import nodemailer from 'nodemailer';
import type { UploadApiResponse } from "cloudinary";
import fs from 'node:fs';
import path from "node:path";

const imageElem = `<p class=t69 style="margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#466ce8;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><a href={{imageUrl}}>{{imageText}}</a></p>`;

let html = fs.readFileSync(path.resolve(import.meta.dirname + '../../../quote.html'), { encoding: 'utf-8' });

export default async function handleQuoteData(req: Request, res: Response) {
    try {
        const images = req.files as Express.Multer.File[] | undefined;
        if(!images || images.length === 0) throw new Error('Please upload at least one image of the damage');
        
        const results = await Promise.all(images.map(image => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                    if(error) {
                        reject(error);
                    } else resolve(result);
                });
                stream.end(image.buffer);
            })
        })) as UploadApiResponse[]

        html = html.replace('{{fullName}}', req.body.fullName)
        .replace('{{phone}}', req.body.phone)
        .replace('{{email}}', req.body.email)
        .replace('{{vehicleRegistration}}', req.body.vehicleRegistration)
        .replace('{{damageDescription}}', req.body.damageDescription)

        // Adding images to the html

        const imageElements = results.map((r, i) => {
            return imageElem.replace('{{imageUrl}}', r.secure_url).replace('{{imageText}}', `image ${i + 1}`)
        })

        html = html.replace('{{imageElement}}', imageElements.join(''));

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
            subject: 'New Quote Request Received',
            html
        })
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message: 'An unexpected error occurred' });
    }
}