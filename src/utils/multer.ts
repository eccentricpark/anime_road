import multer from 'multer';

export const multerOption = {
    options: {
        storage: multer.diskStorage(
            {
                destination: './uploads',
                filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
            }
        )
    }
};