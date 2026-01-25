import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Properties
  async listProperties(params: {
    skip?: number;
    take?: number;
    type?: string;
    status?: string;
    state?: string;
    search?: string;
  }) {
    const where: Prisma.PropertyWhereInput = {};
    if (params.type) where.type = params.type as any;
    if (params.status) where.status = params.status as any;
    if (params.state) where.state = { contains: params.state, mode: 'insensitive' };
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

  async getProperty(id: string) {
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
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async createProperty(data: Prisma.PropertyCreateInput) {
    const input: any = { ...data };
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
              create: images.map((item: any, index: number) => ({
                url: typeof item === 'string' ? item : item.url,
                altText: typeof item === 'string' ? undefined : item.altText,
                sortOrder: index,
              })),
            }
          : undefined,
        variants: variants.length
          ? {
              create: variants.map((item: any, index: number) => ({
                ...item,
                sortOrder: index,
              })),
            }
          : undefined,
        media: media.length
          ? {
              create: media.map((item: any, index: number) => ({
                ...item,
                sortOrder: index,
              })),
            }
          : undefined,
      },
    });
  }

  async updateProperty(id: string, data: Prisma.PropertyUpdateInput) {
    const input: any = { ...data };
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
                create: images.map((item: any, index: number) => ({
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
                create: variants.map((item: any, index: number) => ({
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
                create: media.map((item: any, index: number) => ({
                  ...item,
                  sortOrder: index,
                })),
              },
            }
          : {}),
      },
    });
  }

  async deleteProperty(id: string) {
    return this.prisma.property.delete({ where: { id } });
  }

  // Blog
  async listBlog(params: { skip?: number; take?: number }) {
    return this.prisma.blogPost.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: { createdAt: 'desc' },
      include: { categories: true, tags: true },
    });
  }

  async getBlog(id: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: { categories: true, tags: true },
    });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async createBlog(data: Prisma.BlogPostCreateInput) {
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
    return this.prisma.blogPost.create({ data });
  }

  async updateBlog(id: string, data: Prisma.BlogPostUpdateInput) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async deleteBlog(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  // FAQ / Offices / Resources / Promos / Compliance / Partners / ContentBlocks
  async listFAQs() {
    return this.prisma.generalFAQ.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async getFAQ(id: string) {
    const faq = await this.prisma.generalFAQ.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException('FAQ not found');
    return faq;
  }

  async createFAQ(data: Prisma.GeneralFAQCreateInput) {
    return this.prisma.generalFAQ.create({ data });
  }

  async updateFAQ(id: string, data: Prisma.GeneralFAQUpdateInput) {
    return this.prisma.generalFAQ.update({ where: { id }, data });
  }

  async deleteFAQ(id: string) {
    return this.prisma.generalFAQ.delete({ where: { id } });
  }

  async listOffices() {
    return this.prisma.officeLocation.findMany({ orderBy: { state: 'asc' } });
  }

  async getOffice(id: string) {
    const office = await this.prisma.officeLocation.findUnique({ where: { id } });
    if (!office) throw new NotFoundException('Office not found');
    return office;
  }

  async createOffice(data: Prisma.OfficeLocationCreateInput) {
    return this.prisma.officeLocation.create({ data });
  }

  async updateOffice(id: string, data: Prisma.OfficeLocationUpdateInput) {
    return this.prisma.officeLocation.update({ where: { id }, data });
  }

  async deleteOffice(id: string) {
    return this.prisma.officeLocation.delete({ where: { id } });
  }

  async listResources() {
    return this.prisma.generalResource.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { estate: true },
    });
  }

  async getResource(id: string) {
    const resource = await this.prisma.generalResource.findUnique({
      where: { id },
      include: { estate: true },
    });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async createResource(data: Prisma.GeneralResourceCreateInput) {
    return this.prisma.generalResource.create({ data });
  }

  async updateResource(id: string, data: Prisma.GeneralResourceUpdateInput) {
    return this.prisma.generalResource.update({ where: { id }, data });
  }

  async deleteResource(id: string) {
    return this.prisma.generalResource.delete({ where: { id } });
  }

  async listPromos() {
    return this.prisma.promoBanner.findMany({
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async getPromo(id: string) {
    const promo = await this.prisma.promoBanner.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Promo not found');
    return promo;
  }

  async createPromo(data: Prisma.PromoBannerCreateInput) {
    return this.prisma.promoBanner.create({ data });
  }

  async updatePromo(id: string, data: Prisma.PromoBannerUpdateInput) {
    return this.prisma.promoBanner.update({ where: { id }, data });
  }

  async deletePromo(id: string) {
    return this.prisma.promoBanner.delete({ where: { id } });
  }

  async listCompliance() {
    return this.prisma.complianceItem.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getCompliance(id: string) {
    const item = await this.prisma.complianceItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Compliance item not found');
    return item;
  }

  async createCompliance(data: Prisma.ComplianceItemCreateInput) {
    return this.prisma.complianceItem.create({ data });
  }

  async updateCompliance(id: string, data: Prisma.ComplianceItemUpdateInput) {
    return this.prisma.complianceItem.update({ where: { id }, data });
  }

  async deleteCompliance(id: string) {
    return this.prisma.complianceItem.delete({ where: { id } });
  }

  async listPartners() {
    return this.prisma.partnerLogo.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getPartner(id: string) {
    const partner = await this.prisma.partnerLogo.findUnique({ where: { id } });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async createPartner(data: Prisma.PartnerLogoCreateInput) {
    return this.prisma.partnerLogo.create({ data });
  }

  async updatePartner(id: string, data: Prisma.PartnerLogoUpdateInput) {
    return this.prisma.partnerLogo.update({ where: { id }, data });
  }

  async deletePartner(id: string) {
    return this.prisma.partnerLogo.delete({ where: { id } });
  }

  async listContentBlocks() {
    return this.prisma.contentBlock.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getContentBlock(id: string) {
    const block = await this.prisma.contentBlock.findUnique({ where: { id } });
    if (!block) throw new NotFoundException('Content block not found');
    return block;
  }

  async createContentBlock(data: Prisma.ContentBlockCreateInput) {
    return this.prisma.contentBlock.create({ data });
  }

  async updateContentBlock(id: string, data: Prisma.ContentBlockUpdateInput) {
    return this.prisma.contentBlock.update({ where: { id }, data });
  }

  async deleteContentBlock(id: string) {
    return this.prisma.contentBlock.delete({ where: { id } });
  }

  // Estates
  async listEstates(params: { skip?: number; take?: number } = {}) {
    return this.prisma.estate.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async getEstate(id: string) {
    const estate = await this.prisma.estate.findUnique({
      where: { id },
      include: { faqs: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!estate) throw new NotFoundException('Estate not found');
    return estate;
  }

  async createEstate(data: any) {
    const input: any = { ...data };
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
              create: faqs.map((item: any, index: number) => ({
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

  async updateEstate(id: string, data: any) {
    const input: any = { ...data };
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
                create: faqs.map((item: any, index: number) => ({
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

  async deleteEstate(id: string) {
    return this.prisma.estate.delete({ where: { id } });
  }

  // Team Members
  async listTeamMembers() {
    return this.prisma.teamMember.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getTeamMember(id: string) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async createTeamMember(data: Prisma.TeamMemberCreateInput) {
    return this.prisma.teamMember.create({ data });
  }

  async updateTeamMember(id: string, data: Prisma.TeamMemberUpdateInput) {
    return this.prisma.teamMember.update({ where: { id }, data });
  }

  async deleteTeamMember(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }

  // Testimonials
  async listTestimonials() {
    return this.prisma.testimonial.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getTestimonial(id: string) {
    const item = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async createTestimonial(data: Prisma.TestimonialCreateInput) {
    return this.prisma.testimonial.create({ data });
  }

  async updateTestimonial(id: string, data: Prisma.TestimonialUpdateInput) {
    return this.prisma.testimonial.update({ where: { id }, data });
  }

  async deleteTestimonial(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  // Newsletter Subscribers
  async listSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Leads
  async listLeads(params: {
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
