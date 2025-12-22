import express from 'express';
import multer from 'multer';
import fileFilter from '../utils/file-filter.js';
import { validateGetQuoteForm } from '../utils/validator.js';
import checkErrors from '../utils/check-errors.js';
import type { Request, Response } from 'express';
import handleQuoteData from '../utils/handle-quote-data.js';

const QuoteRouter = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 30 * 1048576,
        files: 5
    },
    fileFilter
 });

QuoteRouter.post('/quote', upload.array('images', 5), validateGetQuoteForm, checkErrors, handleQuoteData)

export default QuoteRouter;