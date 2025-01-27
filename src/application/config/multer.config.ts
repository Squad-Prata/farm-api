import { diskStorage } from 'multer';
import * as path from 'path';

const multerConfig = { 
  storage: diskStorage({
    destination: './uploads',
     filename: (req, file, callback) => {
      const fileName = Date.now() + '-' + path.parse(file.originalname).name.replace(/\s/g, '');
      const extension = path.parse(file.originalname).ext;
      callback(null, `${fileName}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
};

export default multerConfig;
