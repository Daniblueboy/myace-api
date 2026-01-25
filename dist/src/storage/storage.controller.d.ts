import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    upload(file: Express.Multer.File, folder?: string): Promise<{
        key: string;
        url: string;
    }>;
}
