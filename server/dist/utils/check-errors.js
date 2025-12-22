import { validationResult } from "express-validator";
export default function checkErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        res.status(400).json({
            success: false,
            errorMessage: error.msg,
        });
        return;
    }
    next();
}
