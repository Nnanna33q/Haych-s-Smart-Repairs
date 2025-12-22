var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cloudinary from "./cloudinary.js";
Request;
export default function uploadToCloudinary(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const images = req.files;
            if (!images || images.length === 0)
                throw new Error('Please upload at least one image of the damage');
            const results = yield Promise.all(images.map(image => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else
                            resolve(result);
                    });
                    stream.end(image.buffer);
                });
            }));
            const imageUrls = results.map(r => r.secure_url);
            // Send mail to website owner next
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred' });
        }
    });
}
