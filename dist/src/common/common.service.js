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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommonService = class CommonService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllFAQs() {
        return this.prisma.generalFAQ.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    async createFAQ(data) {
        return this.prisma.generalFAQ.create({ data });
    }
    async updateFAQ(id, data) {
        return this.prisma.generalFAQ.update({ where: { id }, data });
    }
    async removeFAQ(id) {
        return this.prisma.generalFAQ.delete({ where: { id } });
    }
    async findAllOffices() {
        return this.prisma.officeLocation.findMany();
    }
    async createOffice(data) {
        return this.prisma.officeLocation.create({ data });
    }
    async updateOffice(id, data) {
        return this.prisma.officeLocation.update({ where: { id }, data });
    }
    async removeOffice(id) {
        return this.prisma.officeLocation.delete({ where: { id } });
    }
    async findAllResources(params = {}) {
        const where = {};
        if (params.search) {
            where.title = { contains: params.search, mode: 'insensitive' };
        }
        if (params.estateId) {
            where.estateId = params.estateId;
        }
        if (!params.estateId && params.estateSlug) {
            where.estate = { slug: params.estateSlug };
        }
        return this.prisma.generalResource.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
            include: { estate: true },
        });
    }
    async createResource(data) {
        return this.prisma.generalResource.create({ data });
    }
    async updateResource(id, data) {
        return this.prisma.generalResource.update({ where: { id }, data });
    }
    async removeResource(id) {
        return this.prisma.generalResource.delete({ where: { id } });
    }
    async findActivePromos(params) {
        const now = new Date();
        return this.prisma.promoBanner.findMany({
            where: {
                active: true,
                placement: params.placement,
                OR: [
                    { startDate: null },
                    { startDate: { lte: now } },
                ],
                AND: [
                    {
                        OR: [
                            { endDate: null },
                            { endDate: { gte: now } },
                        ],
                    },
                ],
            },
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async findAllPromos() {
        return this.prisma.promoBanner.findMany({
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async createPromo(data) {
        return this.prisma.promoBanner.create({ data });
    }
    async updatePromo(id, data) {
        return this.prisma.promoBanner.update({ where: { id }, data });
    }
    async removePromo(id) {
        return this.prisma.promoBanner.delete({ where: { id } });
    }
    async findActiveCompliance(displayOnHome) {
        return this.prisma.complianceItem.findMany({
            where: {
                active: true,
                ...(displayOnHome !== undefined ? { displayOnHome } : {}),
            },
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findAllCompliance() {
        return this.prisma.complianceItem.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async createCompliance(data) {
        return this.prisma.complianceItem.create({ data });
    }
    async updateCompliance(id, data) {
        return this.prisma.complianceItem.update({ where: { id }, data });
    }
    async removeCompliance(id) {
        return this.prisma.complianceItem.delete({ where: { id } });
    }
    async findActivePartners() {
        return this.prisma.partnerLogo.findMany({
            where: { active: true },
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findAllPartners() {
        return this.prisma.partnerLogo.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async createPartner(data) {
        return this.prisma.partnerLogo.create({ data });
    }
    async updatePartner(id, data) {
        return this.prisma.partnerLogo.update({ where: { id }, data });
    }
    async removePartner(id) {
        return this.prisma.partnerLogo.delete({ where: { id } });
    }
    async findContentBlocks() {
        return this.prisma.contentBlock.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async createContentBlock(data) {
        return this.prisma.contentBlock.create({ data });
    }
    async updateContentBlock(id, data) {
        return this.prisma.contentBlock.update({ where: { id }, data });
    }
    async removeContentBlock(id) {
        return this.prisma.contentBlock.delete({ where: { id } });
    }
    async findEstates(params = {}) {
        return this.prisma.estate.findMany({
            skip: params.skip,
            take: params.take,
            orderBy: [{ createdAt: 'desc' }],
        });
    }
    async countEstates() {
        return this.prisma.estate.count();
    }
    async findEstateBySlug(slug) {
        return this.prisma.estate.findUnique({
            where: { slug },
            include: {
                properties: {
                    include: { images: true, variants: true, media: true },
                    orderBy: { createdAt: 'desc' },
                },
                faqs: { orderBy: { sortOrder: 'asc' } },
            },
        });
    }
    async findActiveTeamMembers() {
        return this.prisma.teamMember.findMany({
            where: { active: true },
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findAllTeamMembers() {
        return this.prisma.teamMember.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async createTeamMember(data) {
        return this.prisma.teamMember.create({ data });
    }
    async updateTeamMember(id, data) {
        return this.prisma.teamMember.update({ where: { id }, data });
    }
    async removeTeamMember(id) {
        return this.prisma.teamMember.delete({ where: { id } });
    }
    async findActiveTestimonials() {
        return this.prisma.testimonial.findMany({
            where: { active: true },
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async findAllTestimonials() {
        return this.prisma.testimonial.findMany({
            orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async createTestimonial(data) {
        return this.prisma.testimonial.create({ data });
    }
    async updateTestimonial(id, data) {
        return this.prisma.testimonial.update({ where: { id }, data });
    }
    async removeTestimonial(id) {
        return this.prisma.testimonial.delete({ where: { id } });
    }
    async createSubscriber(email) {
        const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
        if (existing)
            return existing;
        return this.prisma.newsletterSubscriber.create({ data: { email } });
    }
    async listSubscribers() {
        return this.prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async createLead(data) {
        return this.prisma.leadSubmission.create({ data });
    }
    async findLeads(params) {
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
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonService);
//# sourceMappingURL=common.service.js.map