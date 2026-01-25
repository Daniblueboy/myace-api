import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommonService {
  constructor(private prisma: PrismaService) {}

  // FAQs
  async findAllFAQs() {
    return this.prisma.generalFAQ.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async createFAQ(data: Prisma.GeneralFAQCreateInput) {
    return this.prisma.generalFAQ.create({ data });
  }

  async updateFAQ(id: string, data: Prisma.GeneralFAQUpdateInput) {
    return this.prisma.generalFAQ.update({ where: { id }, data });
  }

  async removeFAQ(id: string) {
    return this.prisma.generalFAQ.delete({ where: { id } });
  }

  // Office Locations
  async findAllOffices() {
    return this.prisma.officeLocation.findMany();
  }

  async createOffice(data: Prisma.OfficeLocationCreateInput) {
    return this.prisma.officeLocation.create({ data });
  }

  async updateOffice(id: string, data: Prisma.OfficeLocationUpdateInput) {
    return this.prisma.officeLocation.update({ where: { id }, data });
  }

  async removeOffice(id: string) {
    return this.prisma.officeLocation.delete({ where: { id } });
  }

  // General Resources
  async findAllResources(params: { search?: string; estateId?: string; estateSlug?: string } = {}) {
    const where: Prisma.GeneralResourceWhereInput = {};
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

  async createResource(data: Prisma.GeneralResourceCreateInput) {
    return this.prisma.generalResource.create({ data });
  }

  async updateResource(id: string, data: Prisma.GeneralResourceUpdateInput) {
    return this.prisma.generalResource.update({ where: { id }, data });
  }

  async removeResource(id: string) {
    return this.prisma.generalResource.delete({ where: { id } });
  }

  // Promos
  async findActivePromos(params: { placement?: string }) {
    const now = new Date();
    return this.prisma.promoBanner.findMany({
      where: {
        active: true,
        placement: params.placement as any,
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

  async createPromo(data: Prisma.PromoBannerCreateInput) {
    return this.prisma.promoBanner.create({ data });
  }

  async updatePromo(id: string, data: Prisma.PromoBannerUpdateInput) {
    return this.prisma.promoBanner.update({ where: { id }, data });
  }

  async removePromo(id: string) {
    return this.prisma.promoBanner.delete({ where: { id } });
  }

  // Compliance
  async findActiveCompliance(displayOnHome?: boolean) {
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

  async createCompliance(data: Prisma.ComplianceItemCreateInput) {
    return this.prisma.complianceItem.create({ data });
  }

  async updateCompliance(id: string, data: Prisma.ComplianceItemUpdateInput) {
    return this.prisma.complianceItem.update({ where: { id }, data });
  }

  async removeCompliance(id: string) {
    return this.prisma.complianceItem.delete({ where: { id } });
  }

  // Partners/Clients
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

  async createPartner(data: Prisma.PartnerLogoCreateInput) {
    return this.prisma.partnerLogo.create({ data });
  }

  async updatePartner(id: string, data: Prisma.PartnerLogoUpdateInput) {
    return this.prisma.partnerLogo.update({ where: { id }, data });
  }

  async removePartner(id: string) {
    return this.prisma.partnerLogo.delete({ where: { id } });
  }

  // Content Blocks
  async findContentBlocks() {
    return this.prisma.contentBlock.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createContentBlock(data: Prisma.ContentBlockCreateInput) {
    return this.prisma.contentBlock.create({ data });
  }

  async updateContentBlock(id: string, data: Prisma.ContentBlockUpdateInput) {
    return this.prisma.contentBlock.update({ where: { id }, data });
  }

  async removeContentBlock(id: string) {
    return this.prisma.contentBlock.delete({ where: { id } });
  }

  // Estates
  async findEstates(params: { skip?: number; take?: number } = {}) {
    return this.prisma.estate.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async countEstates() {
    return this.prisma.estate.count();
  }

  async findEstateBySlug(slug: string) {
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

  // Team Members
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

  async createTeamMember(data: Prisma.TeamMemberCreateInput) {
    return this.prisma.teamMember.create({ data });
  }

  async updateTeamMember(id: string, data: Prisma.TeamMemberUpdateInput) {
    return this.prisma.teamMember.update({ where: { id }, data });
  }

  async removeTeamMember(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }

  // Testimonials
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

  async createTestimonial(data: Prisma.TestimonialCreateInput) {
    return this.prisma.testimonial.create({ data });
  }

  async updateTestimonial(id: string, data: Prisma.TestimonialUpdateInput) {
    return this.prisma.testimonial.update({ where: { id }, data });
  }

  async removeTestimonial(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  // Newsletter
  async createSubscriber(email: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) return existing;
    return this.prisma.newsletterSubscriber.create({ data: { email } });
  }

  async listSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Leads
  async createLead(data: Prisma.LeadSubmissionUncheckedCreateInput) {
    return this.prisma.leadSubmission.create({ data });
  }

  async findLeads(params: {
    type?: string;
    enquiryType?: string;
    officeState?: string;
    propertyId?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const where: Prisma.LeadSubmissionWhereInput = {};
    if (params.type) where.type = params.type as any;
    if (params.enquiryType) where.enquiryType = params.enquiryType;
    if (params.officeState) where.officeState = params.officeState;
    if (params.propertyId) where.propertyId = params.propertyId;
    if (params.search) {
      where.OR = [
        { fullName: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.dateFrom || params.dateTo) {
      where.createdAt = {};
      if (params.dateFrom) where.createdAt.gte = new Date(params.dateFrom);
      if (params.dateTo) where.createdAt.lte = new Date(params.dateTo);
    }
    return this.prisma.leadSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }
}
