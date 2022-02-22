import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  file: FileUpload;
}

@Injectable()
export class FileService {
  async upload({ file }: IFile) {
    //스토리지에 이미지 업로드
    const storage = new Storage({
      keyFilename: 'gcp-file-storage.json',
      projectId: 'graphite-guard-341008',
    })
      .bucket('codecamp-image-storage-bucket')
      .file(file.filename);

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.createWriteStream())
        .on('finish', () =>
          resolve(`codecamp-image-storage-bucket/${file.filename}`),
        )
        .on('error', (error) => reject(error));
    });

    return result;
  }
}
