"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listProperties(params) {
        const where = {};
        if (params.type)
            where.type = params.type;
        if (params.status)
            where.status = params.status;
        if (params.state)
            where.state = { contains: params.state, mode: 'insensitive' };
        if (params.search) {
            where.OR = [
                { title: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
                { city: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.property.findMany({
            where,
            skip: params.skip,
            take: params.take,
            orderBy: { createdAt: 'desc' },
            include: { images: true, estate: true },
        });
    }
    async getProperty(id) {
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                faqs: true,
                resources: true,
                variants: { orderBy: { sortOrder: 'asc' } },
                media: { orderBy: { sortOrder: 'asc' } },
                estate: true,
            },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        return property;
    }
    async createProperty(data) {
        const input = { ...data };
        if (!input.slug) {
            input.slug = input.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        }
        const images = Array.isArray(input.images) ? input.images : [];
        const variants = Array.isArray(input.variants) ? input.variants : [];
        const media = Array.isArray(input.media) ? input.media : [];
        delete input.images;
        delete input.variants;
        delete input.media;
        return this.prisma.property.create({
            data: {
                ...input,
                images: images.length
                    ? {
                        create: images.map((item, index) => ({
                            url: typeof item === 'string' ? item : item.url,
                            altText: typeof item === 'string' ? undefined : item.altText,
                            sortOrder: index,
                        })),
                    }
                    : undefined,
                variants: variants.length
                    ? {
                        create: variants.map((item, index) => ({
                            ...item,
                            sortOrder: index,
                        })),
                    }
                    : undefined,
                media: media.length
                    ? {
                        create: media.map((item, index) => ({
                            ...item,
                            sortOrder: index,
                        })),
                    }
                    : undefined,
            },
        });
    }
    async updateProperty(id, data) {
        const input = { ...data };
        const images = Array.isArray(input.images) ? input.images : null;
        const variants = Array.isArray(input.variants) ? input.variants : null;
        const media = Array.isArray(input.media) ? input.media : null;
        delete input.images;
        delete input.variants;
        delete input.media;
        return this.prisma.property.update({
            where: { id },
            data: {
                ...input,
                ...(images
                    ? {
                        images: {
                            deleteMany: {},
                            create: images.map((item, index) => ({
                                url: typeof item === 'string' ? item : item.url,
                                altText: typeof item === 'string' ? undefined : item.altText,
                                sortOrder: index,
                            })),
                        },
                    }
                    : {}),
                ...(variants
                    ? {
                        variants: {
                            deleteMany: {},
                            create: variants.map((item, index) => ({
                                ...item,
                                sortOrder: index,
                            })),
                        },
                    }
                    : {}),
                ...(media
                    ? {
                        media: {
                            deleteMany: {},
                            create: media.map((item, index) => ({
                                ...item,
                                sortOrder: index,
                            })),
                        },
                    }
                    : {}),
            },
        });
    }
    async deleteProperty(id) {
        return this.prisma.property.delete({ where: { id } });
    }
    async listBlog(params) {
        return this.prisma.blogPost.findMany({
            skip: params.skip,
            take: params.take,
            orderBy: { createdAt: 'desc' },
            include: { categories: true, tags: true },
        });
    }
    async getBlog(id) {
        const post = await this.prisma.blogPost.findUnique({
            where: { id },
            include: { categories: true, tags: true },
        });
        if (!post)
            throw new common_1.NotFoundException('Blog post not found');
        return post;
    }
    async createBlog(data) {
        if (!data.slug) {
            data.slug = data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        }
        return this.prisma.blogPost.create({ data });
    }
    async updateBlog(id, data) {
        return this.prisma.blogPost.update({ where: { id }, data });
    }
    async deleteBlog(id) {
        return this.prisma.blogPost.delete({ where: { id } });
    }
    async listFAQs() {
        return this.prisma.generalFAQ.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    async getFAQ(id) {
        const faq = await this.prisma.generalFAQ.findUnique({ where: { id } });
        if (!faq)
            throw new common_1.NotFoundException('FAQ not found');
        return faq;
    }
    async createFAQ(data) {
        return this.prisma.generalFAQ.create({ data });
    }
    async updateFAQ(id, data) {
        return this.prisma.generalFAQ.update({ where: { id }, data });
    }
    async deleteFAQ(id) {
        return this.prisma.generalFAQ.delete({ where: { id } });
    }
    async listOffices() {
        return this.prisma.officeLocation.findMany({ orderBy: { state: 'asc' } });
    }
    async getOffice(id) {
        const office = await this.prisma.officeLocation.findUnique({ where: { id } });
        if (!office)
            throw new common_1.NotFoundException('Office not found');
        return office;
    }
    async createOffice(data) {
        return this.prisma.officeLocation.create({ data });
    }
    async updateOffice(id, data) {
        return this.prisma.officeLocation.update({ where: { id }, data });
    }
    async deleteOffice(id) {
        return this.prisma.officeLocation.delete({ where: { id } });
    }
    async listResources() {
        return this.prisma.generalResource.findMany({
            orderBy: { sortOrder: 'asc' },
            include: { estate: true },
        });
    }
    async getResource(id) {
        const resource = await this.prisma.generalResource.findUnique({
            where: { id },
            include: { estate: true },
        });
        if (!resource)
            throw new common_1.NotFoundException('Resource not found');
        return resource;
    }
    async createResource(data) {
        return this.prisma.generalResource.create({ data });
    }
    async updateResource(id, data) {
        return this.prisma.generalResource.update({ where: { id }, data });
    }
    async deleteResource(id) {
        return this.prisma.generalResource.delete({ where: { id } });
    }
    async listPromos() {
        return this.prisma.promoBanner.findMany({
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async getPromo(id) {
        const promo = await this.prisma.promoBanner.findUnique({ where: { id } });
        if (!promo)
            throw new common_1.NotFoundException('Promo not found');
        return promo;
    }
    async createPromo(data) {
        return this.prisma.promoBanner.create({ data });
    }
    async updatePromo(id, data) {
        return this.prisma.promoBanner.update({ where: { id }, data });
    }
    async deletePromo(id) {
        return this.prisma.promoBanner.delete({ where: { id } });
    }
    async listCompliance() {
        return this.prisma.complianceItem.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async getCompliance(id) {
        const item = await this.prisma.complianceItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Compliance item not found');
        return item;
    }
    async createCompliance(data) {
        return this.prisma.complianceItem.create({ data });
    }
    async updateCompliance(id, data) {
        return this.prisma.complianceItem.update({ where: { id }, data });
    }
    async deleteCompliance(id) {
        return this.prisma.complianceItem.delete({ where: { id } });
    }
    async listPartners() {
        return this.prisma.partnerLogo.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async getPartner(id) {
        const partner = await this.prisma.partnerLogo.findUnique({ where: { id } });
        if (!partner)
            throw new common_1.NotFoundException('Partner not found');
        return partner;
    }
    async createPartner(data) {
        return this.prisma.partnerLogo.create({ data });
    }
    async updatePartner(id, data) {
        return this.prisma.partnerLogo.update({ where: { id }, data });
    }
    async deletePartner(id) {
        return this.prisma.partnerLogo.delete({ where: { id } });
    }
    async listContentBlocks() {
        return this.prisma.contentBlock.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async getContentBlock(id) {
        const block = await this.prisma.contentBlock.findUnique({ where: { id } });
        if (!block)
            throw new common_1.NotFoundException('Content block not found');
        return block;
    }
    async createContentBlock(data) {
        return this.prisma.contentBlock.create({ data });
    }
    async updateContentBlock(id, data) {
        return this.prisma.contentBlock.update({ where: { id }, data });
    }
    async deleteContentBlock(id) {
        return this.prisma.contentBlock.delete({ where: { id } });
    }
    async listEstates(params = {}) {
        return this.prisma.estate.findMany({
            skip: params.skip,
            take: params.take,
            orderBy: [{ createdAt: 'desc' }],
        });
    }
    async getEstate(id) {
        const estate = await this.prisma.estate.findUnique({
            where: { id },
            include: { faqs: { orderBy: { sortOrder: 'asc' } } },
        });
        if (!estate)
            throw new common_1.NotFoundException('Estate not found');
        return estate;
    }
    async createEstate(data) {
        const input = { ...data };
        if (!input.slug) {
            input.slug = input.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        }
        const faqs = Array.isArray(input.faqs) ? input.faqs : [];
        delete input.faqs;
        return this.prisma.estate.create({
            data: {
                ...input,
                faqs: faqs.length
                    ? {
                        create: faqs.map((item, index) => ({
                            question: item.question,
                            answer: item.answer,
                            sortOrder: item.sortOrder ?? index,
                        })),
                    }
                    : undefined,
            },
            include: { faqs: true },
        });
    }
    async updateEstate(id, data) {
        const input = { ...data };
        const faqs = Array.isArray(input.faqs) ? input.faqs : null;
        delete input.faqs;
        return this.prisma.estate.update({
            where: { id },
            data: {
                ...input,
                ...(faqs
                    ? {
                        faqs: {
                            deleteMany: {},
                            create: faqs.map((item, index) => ({
                                question: item.question,
                                answer: item.answer,
                                sortOrder: item.sortOrder ?? index,
                            })),
                        },
                    }
                    : {}),
            },
            include: { faqs: true },
        });
    }
    async deleteEstate(id) {
        return this.prisma.estate.delete({ where: { id } });
    }
    async listTeamMembers() {
        return this.prisma.teamMember.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async getTeamMember(id) {
        const member = await this.prisma.teamMember.findUnique({ where: { id } });
        if (!member)
            throw new common_1.NotFoundException('Team member not found');
        return member;
    }
    async createTeamMember(data) {
        return this.prisma.teamMember.create({ data });
    }
    async updateTeamMember(id, data) {
        return this.prisma.teamMember.update({ where: { id }, data });
    }
    async deleteTeamMember(id) {
        return this.prisma.teamMember.delete({ where: { id } });
    }
    async listTestimonials() {
        return this.prisma.testimonial.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async getTestimonial(id) {
        const item = await this.prisma.testimonial.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Testimonial not found');
        return item;
    }
    async createTestimonial(data) {
        return this.prisma.testimonial.create({ data });
    }
    async updateTestimonial(id, data) {
        return this.prisma.testimonial.update({ where: { id }, data });
    }
    async deleteTestimonial(id) {
        return this.prisma.testimonial.delete({ where: { id } });
    }
    async listSubscribers() {
        return this.prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async listLeads(params) {
        const where = {};
        if (params.type)
            where.type = params.type;
        if (params.enquiryType)
            where.enquiryType = params.enquiryType;
        if (params.officeState)
            where.officeState = params.officeState;
        if (params.propertyId)
            where.propertyId = params.propertyId;
        if (params.search) {
            where.OR = [
                { fullName: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
                { phone: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params.dateFrom || params.dateTo) {
            where.createdAt = {};
            if (params.dateFrom)
                where.createdAt.gte = new Date(params.dateFrom);
            if (params.dateTo)
                where.createdAt.lte = new Date(params.dateTo);
        }
        return this.prisma.leadSubmission.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map