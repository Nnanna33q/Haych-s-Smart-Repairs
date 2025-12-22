import { body } from "express-validator"

export const validateGetQuoteForm = [
    body('fullName').trim().isString().notEmpty().withMessage('Please enter your name').isLength({ min: 1, max: 100 }).withMessage('Please enter a valid name (1 - 100 characters)'),
    body('phone').trim().isString().notEmpty().withMessage('Please enter your phone number').isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),
    body('email').trim().isString().notEmpty().withMessage('Please enter your email address').isLength({ min: 5, max: 254 }).withMessage('Please enter a valid email address').isEmail().withMessage('Please enter a valid email address'),
    body('damageDescription').trim().isString().notEmpty().withMessage('Please provide a description of the damage').isLength({ min: 10 }).withMessage('Damage description is too short (minimum 10 characters)').isLength({ max: 4000 }).withMessage('Damage description is too long (Maximum 4000 characters)'),
    body('vehicleRegistration').trim().isString().notEmpty().withMessage('Please enter your vehicle registration').isLength({ min: 5, max: 20 }).withMessage('Please enter a valid vehicle registration number')
]

export const validateContactForm = [
    body('fullName').trim().isString().notEmpty().withMessage('Please enter your name').isLength({ min: 1, max: 100 }).withMessage('Please enter a valid name (1 - 100 characters)'),
    body('phone').trim().isString().notEmpty().withMessage('Please enter your phone number').isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),
    body('email').trim().isString().notEmpty().withMessage('Please enter your email address').isLength({ min: 5, max: 254 }).withMessage('Please enter a valid email address').isEmail().withMessage('Please enter a valid email address'),
    body('message').trim().isString().notEmpty().withMessage('Please enter your message').isLength({ min: 10 }).withMessage('Message is too short (minimum 10 characters)').isLength({ max: 4000 }).withMessage('Message is too long (Maximum 4000 characters)'),
]