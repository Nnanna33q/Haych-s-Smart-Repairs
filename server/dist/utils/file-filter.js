export default function fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
        cb(new Error('Invalid file mimetype'));
    }
    if (file.size > 10485760)
        cb(new Error('File is too large (maximum allowed size is 10 MB)'));
    cb(null, true);
}
