import { diskStorage } from 'multer';

export const dest = 'uploads/images';
export const maxSize = Math.pow(1024, 2);

export const editFileName = (req, file, cb) => {
  cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(null, false);
  }
  callback(null, true);
};

export const storage = {
  storage: diskStorage({
    destination: dest,
    filename: editFileName,
  }),

  fileFilter: imageFileFilter,
  limits: { fileSize: maxSize },
};
