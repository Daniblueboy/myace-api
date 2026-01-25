"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
let StorageService = class StorageService {
    provider = process.env.STORAGE_PROVIDER || 'local';
    uploadDir = process.env.UPLOAD_DIR || path_1.default.join(process.cwd(), 'uploads');
    publicBaseUrl = process.env.PUBLIC_UPLOAD_BASE_URL || 'http://localhost:3000';
    getS3Client() {
        const endpoint = process.env.S3_ENDPOINT;
        const region = process.env.S3_REGION || 'us-east-1';
        const accessKeyId = process.env.S3_ACCESS_KEY_ID;
        const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
        if (!endpoint || !accessKeyId || !secretAccessKey) {
            throw new Error('S3 credentials or endpoint are not configured');
        }
        return new client_s3_1.S3Client({
            region,
            endpoint,
            forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
            credentials: { accessKeyId, secretAccessKey },
        });
    }
    async uploadLocal(file, folder) {
        const ext = path_1.default.extname(file.originalname) || '';
        const safeFolder = folder ? folder.replace(/[^a-zA-Z0-9/_-]/g, '') : 'misc';
        const filename = `${crypto_1.default.randomUUID()}${ext}`;
        const key = path_1.default.posix.join(safeFolder, filename);
        const destPath = path_1.default.join(this.uploadDir, key);
        await fs_1.promises.mkdir(path_1.default.dirname(destPath), { recursive: true });
        await fs_1.promises.writeFile(destPath, file.buffer);
        return {
            key,
            url: `${this.publicBaseUrl}/uploads/${key}`,
        };
    }
    async uploadS3(file, folder) {
        const bucket = process.env.S3_BUCKET;
        if (!bucket) {
            throw new Error('S3_BUCKET is not configured');
        }
        const ext = path_1.default.extname(file.originalname) || '';
        const safeFolder = folder ? folder.replace(/[^a-zA-Z0-9/_-]/g, '') : 'misc';
        const key = path_1.default.posix.join(safeFolder, `${crypto_1.default.randomUUID()}${ext}`);
        const client = this.getS3Client();
        await client.send(new client_s3_1.PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        const publicUrl = process.env.S3_PUBLIC_URL ||
            `${process.env.S3_ENDPOINT?.replace(/\/$/, '')}/${bucket}`;
        return {
            key,
            url: `${publicUrl}/${key}`,
        };
    }
    async upload(file, folder) {
        if (this.provider === 's3') {
            return this.uploadS3(file, folder);
        }
        return this.uploadLocal(file, folder);
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)()
], StorageService);
//# sourceMappingURL=storage.service.js.map