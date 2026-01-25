import { CommonService } from './common.service';
import { Prisma } from '@prisma/client';
export declare class PublicController {
    private readonly commonService;
    constructor(commonService: CommonService);
    findAllFAQs(): Promise<{
        id: string;
        sortOrder: number;
        question: string;
        answer: string;
    }[]>;
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
    findAllResources(search?: string, estateId?: string, estateSlug?: string): Promise<({
        estate: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            state: string;
            city: string;
            address: string | null;
            coverImage: string | null;
            videoUrl: string | null;
            gallery: string[];
            brochureUrl: string | null;
            status: string;
            amenities: string[];
        } | null;
    } & {
        url: string;
        id: string;
        estateId: string | null;
        title: string;
        sortOrder: number;
        fileType: string;
    })[]>;
    findActivePromos(placement?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoUrl: string | null;
        title: string;
        active: boolean;
        linkUrl: string | null;
        message: string;
        details: string | null;
        imageUrl: string | null;
        placement: import("@prisma/client").$Enums.PromoPlacement;
        priority: number;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
    findActiveCompliance(displayOnHome?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        type: import("@prisma/client").$Enums.ComplianceType;
        active: boolean;
        registrationNo: string | null;
        issuedBy: string | null;
        issueDate: Date | null;
        expiryDate: Date | null;
        fileUrl: string | null;
        externalLink: string | null;
        displayOnHome: boolean;
        displayOrder: number;
    }[]>;
    findActivePartners(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        displayOrder: number;
        logoUrl: string;
        websiteUrl: string | null;
        category: import("@prisma/client").$Enums.PartnerCategory;
    }[]>;
    findContentBlocks(section?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        active: boolean;
        content: string;
        imageUrl: string | null;
        displayOrder: number;
        key: string;
        section: string;
        ctaText: string | null;
        ctaUrl: string | null;
    }[]>;
    findEstates(skip?: string, take?: string): Promise<{
        items: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            state: string;
            city: string;
            address: string | null;
            coverImage: string | null;
            videoUrl: string | null;
            gallery: string[];
            brochureUrl: string | null;
            status: string;
            amenities: string[];
        }[];
        total: number;
    }>;
    findEstateBySlug(slug: string): Promise<({
        properties: ({
            images: {
                url: string;
                id: string;
                altText: string | null;
                sortOrder: number;
                propertyId: string;
            }[];
            variants: {
                id: string;
                upfrontPercent: number | null;
                bedrooms: number | null;
                bathrooms: number | null;
                price: Prisma.Decimal;
                size: string | null;
                currency: string;
                sortOrder: number;
                label: string;
                sizeUnit: import("@prisma/client").$Enums.PropertySizeUnit | null;
                paymentType: import("@prisma/client").$Enums.PaymentType;
                installmentMonths: number | null;
                installmentAmount: Prisma.Decimal | null;
                active: boolean;
                propertyId: string;
            }[];
            media: {
                url: string;
                id: string;
                title: string | null;
                type: import("@prisma/client").$Enums.PropertyMediaType;
                sortOrder: number;
                propertyId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            state: string;
            city: string;
            address: string;
            videoUrl: string | null;
            status: import("@prisma/client").$Enums.PropertyStatus;
            amenities: string[];
            estateId: string | null;
            featured: boolean;
            bedrooms: number | null;
            bathrooms: number | null;
            title: string;
            type: import("@prisma/client").$Enums.PropertyType;
            price: Prisma.Decimal;
            size: string | null;
            currency: string;
            latitude: number | null;
            longitude: number | null;
            mapEmbedUrl: string | null;
            panoramaUrl: string | null;
        })[];
        faqs: {
            id: string;
            estateId: string;
            sortOrder: number;
            question: string;
            answer: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        state: string;
        city: string;
        address: string | null;
        coverImage: string | null;
        videoUrl: string | null;
        gallery: string[];
        brochureUrl: string | null;
        status: string;
        amenities: string[];
    }) | null>;
    findTeamMembers(): Promise<{
        id: string;
        email: string | null;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        displayOrder: number;
        linkedinUrl: string | null;
        bio: string | null;
        photoUrl: string | null;
        instagramUrl: string | null;
    }[]>;
    findTestimonials(): Promise<{
        id: string;
        name: string;
        role: string | null;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        message: string;
        displayOrder: number;
        photoUrl: string | null;
        rating: number | null;
    }[]>;
    createLead(data: Prisma.LeadSubmissionUncheckedCreateInput): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.LeadType;
        message: string | null;
        fullName: string;
        phone: string | null;
        officeState: string | null;
        enquiryType: string | null;
        propertyId: string | null;
    }>;
    subscribe(body: {
        email: string;
    }): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
