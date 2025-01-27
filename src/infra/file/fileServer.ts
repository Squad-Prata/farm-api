import multer from 'multer';

export default interface FileServer {
  single(fieldName: string): any;
}

export class MulterAdapter implements FileServer {

  private upload: any;
    
  constructor (readonly multerConfig: object) {
    // this.upload = multer({ storage: multerConfig });
    this.upload = multer(multerConfig);
    }

  single(fieldName: string) {
    return this.upload.single(fieldName);
  }
}

