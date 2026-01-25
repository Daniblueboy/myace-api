export declare class StorageService {
    private readonly provider;
    private readonly uploadDir;
    private readonly publicBaseUrl;
    private getS3Client;
    private uploadLocal;
    private uploadS3;
    upload(file: Express.Multer.File, folder?: string): Promise<{
        key: string;
        url: string;
    }>;
}
