import express from 'express';
import checkErrors from '../utils/check-errors.js';
import { validateContactForm } from '../utils/validator.js';
import sendMail from '../utils/mail.js';

const ContactRouter = express.Router();

ContactRouter.post('/contact', validateContactForm, checkErrors, sendMail)

export default ContactRouter;