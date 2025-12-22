import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import QuoteRouter from './routes/quote.js';
import ContactRouter from './routes/contact.js';
import PingRouter from './routes/ping.js';

if(!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing cloudinary environment variables');
    process.exit(1);
} 

if(!process.env.CLIENT_DOMAIN) {
    console.error('Missing client domain environment variable');
    process.exit(1);
}

const app = express();

app.use(cors({
    origin: process.env.NODE_ENVIRONMENT === 'production' ? process.env.CLIENT_DOMAIN : 'http://127.0.0.1:5500'
}))

app.use(express.json());

app.use(QuoteRouter);
app.use(PingRouter);
app.use(ContactRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server is live'));