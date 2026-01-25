import { CommonService } from './common.service';
import { Prisma } from '@prisma/client';
export declare class CommonController {
    private readonly commonService;
    constructor(commonService: CommonService);
    findAllFAQs(): Promise<{
        id: string;
        sortOrder: number;
        question: string;
        answer: string;
    }[]>;
    createFAQ(createFAQDto: Prisma.GeneralFAQCreateInput): Promise<{
        id: string;
        sortOrder: number;
        question: string;
        answer: string;
    }>;
    updateFAQ(id: string, updateFAQDto: Prisma.GeneralFAQUpdateInput): Promise<{
        id: string;
        sortOrder: number;
        question: string;
        answer: string;
    }>;
    removeFAQ(id: string): Promise<{
        id: string;
        sortOrder: number;
        question: string;
        answer: string;
    }>;
    findAllOffices(): Promise<{
        id: string;
        state: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phones: string[];
        emails: string[];
        openingHours: string | null;
    }[]>;
    createOffice(createOfficeDto: Prisma.OfficeLocationCreateInput): Promise<{
        id: string;
        state: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phones: string[];
        emails: string[];
        openingHours: string | null;
    }>;
    updateOffice(id: string, updateOfficeDto: Prisma.OfficeLocationUpdateInput): Promise<{
        id: string;
        state: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phones: string[];
        emails: string[];
        openingHours: string | null;
    }>;
    removeOffice(id: string): Promise<{
        id: string;
        state: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        phones: string[];
        emails: string[];
        openingHours: string | null;
    }>;
}
