import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

type UploadResult = {
  url: string;
  key: string;
};

@Injectable()
export class StorageService {
  private readonly provider = process.env.STORAGE_PROVIDER || 'local';
  private readonly uploadDir =
    process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  private readonly publicBaseUrl =
    process.env.PUBLIC_UPLOAD_BASE_URL || 'http://localhost:3000';

  private getS3Client() {
    const endpoint = process.env.S3_ENDPOINT;
    const region = process.env.S3_REGION || 'us-east-1';
    const accessKeyId = process.env.S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new Error('S3 credentials or endpoint are not configured');
    }
    return new S3Client({
      region,
      endpoint,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  private async uploadLocal(file: Express.Multer.File, folder?: string) {
    const ext = path.extname(file.originalname) || '';
    const safeFolder = folder ? folder.replace(/[^a-zA-Z0-9/_-]/g, '') : 'misc';
    const filename = `${crypto.randomUUID()}${ext}`;
    const key = path.posix.join(safeFolder, filename);
    const destPath = path.join(this.uploadDir, key);

    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.writeFile(destPath, file.buffer);

    return {
      key,
      url: `${this.publicBaseUrl}/uploads/${key}`,
    } satisfies UploadResult;
  }

  private async uploadS3(file: Express.Multer.File, folder?: string) {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) {
      throw new Error('S3_BUCKET is not configured');
    }
    const ext = path.extname(file.originalname) || '';
    const safeFolder = folder ? folder.replace(/[^a-zA-Z0-9/_-]/g, '') : 'misc';
    const key = path.posix.join(safeFolder, `${crypto.randomUUID()}${ext}`);
    const client = this.getS3Client();

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const publicUrl =
      process.env.S3_PUBLIC_URL ||
      `${process.env.S3_ENDPOINT?.replace(/\/$/, '')}/${bucket}`;

    return {
      key,
      url: `${publicUrl}/${key}`,
    } satisfies UploadResult;
  }

  async upload(file: Express.Multer.File, folder?: string) {
    if (this.provider === 's3') {
      return this.uploadS3(file, folder);
    }
    return this.uploadLocal(file, folder);
  }
}
