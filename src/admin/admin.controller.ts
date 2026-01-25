import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Prisma, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import type { Response } from 'express';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Properties
  @Get('properties')
  listProperties(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('state') state?: string,
    @Query('search') search?: string,
  ) {
    return this.adminService.listProperties({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      type,
      status,
      state,
      search,
    });
  }

  @Get('properties/:id')
  getProperty(@Param('id') id: string) {
    return this.adminService.getProperty(id);
  }

  @Post('properties')
  createProperty(@Body() data: Prisma.PropertyCreateInput) {
    return this.adminService.createProperty(data);
  }

  @Patch('properties/:id')
  updateProperty(@Param('id') id: string, @Body() data: Prisma.PropertyUpdateInput) {
    return this.adminService.updateProperty(id, data);
  }

  @Delete('properties/:id')
  deleteProperty(@Param('id') id: string) {
    return this.adminService.deleteProperty(id);
  }

  // Blog
  @Get('blog')
  listBlog(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.adminService.listBlog({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @Get('blog/:id')
  getBlog(@Param('id') id: string) {
    return this.adminService.getBlog(id);
  }

  @Post('blog')
  createBlog(@Body() data: Prisma.BlogPostCreateInput) {
    return this.adminService.createBlog(data);
  }

  @Patch('blog/:id')
  updateBlog(@Param('id') id: string, @Body() data: Prisma.BlogPostUpdateInput) {
    return this.adminService.updateBlog(id, data);
  }

  @Delete('blog/:id')
  deleteBlog(@Param('id') id: string) {
    return this.adminService.deleteBlog(id);
  }

  // FAQs
  @Get('faqs')
  listFAQs() {
    return this.adminService.listFAQs();
  }

  @Get('faqs/:id')
  getFAQ(@Param('id') id: string) {
    return this.adminService.getFAQ(id);
  }

  @Post('faqs')
  createFAQ(@Body() data: Prisma.GeneralFAQCreateInput) {
    return this.adminService.createFAQ(data);
  }

  @Patch('faqs/:id')
  updateFAQ(@Param('id') id: string, @Body() data: Prisma.GeneralFAQUpdateInput) {
    return this.adminService.updateFAQ(id, data);
  }

  @Delete('faqs/:id')
  deleteFAQ(@Param('id') id: string) {
    return this.adminService.deleteFAQ(id);
  }

  // Offices
  @Get('offices')
  listOffices() {
    return this.adminService.listOffices();
  }

  @Get('offices/:id')
  getOffice(@Param('id') id: string) {
    return this.adminService.getOffice(id);
  }

  @Post('offices')
  createOffice(@Body() data: Prisma.OfficeLocationCreateInput) {
    return this.adminService.createOffice(data);
  }

  @Patch('offices/:id')
  updateOffice(@Param('id') id: string, @Body() data: Prisma.OfficeLocationUpdateInput) {
    return this.adminService.updateOffice(id, data);
  }

  @Delete('offices/:id')
  deleteOffice(@Param('id') id: string) {
    return this.adminService.deleteOffice(id);
  }

  // Resources
  @Get('resources')
  listResources() {
    return this.adminService.listResources();
  }

  @Get('resources/:id')
  getResource(@Param('id') id: string) {
    return this.adminService.getResource(id);
  }

  @Post('resources')
  createResource(@Body() data: Prisma.GeneralResourceCreateInput) {
    return this.adminService.createResource(data);
  }

  @Patch('resources/:id')
  updateResource(@Param('id') id: string, @Body() data: Prisma.GeneralResourceUpdateInput) {
    return this.adminService.updateResource(id, data);
  }

  @Delete('resources/:id')
  deleteResource(@Param('id') id: string) {
    return this.adminService.deleteResource(id);
  }

  // Promotions
  @Get('promos')
  listPromos() {
    return this.adminService.listPromos();
  }

  @Get('promos/:id')
  getPromo(@Param('id') id: string) {
    return this.adminService.getPromo(id);
  }

  @Post('promos')
  createPromo(@Body() data: Prisma.PromoBannerCreateInput) {
    return this.adminService.createPromo(data);
  }

  @Patch('promos/:id')
  updatePromo(@Param('id') id: string, @Body() data: Prisma.PromoBannerUpdateInput) {
    return this.adminService.updatePromo(id, data);
  }

  @Delete('promos/:id')
  deletePromo(@Param('id') id: string) {
    return this.adminService.deletePromo(id);
  }

  // Compliance
  @Get('compliance')
  listCompliance() {
    return this.adminService.listCompliance();
  }

  @Get('compliance/:id')
  getCompliance(@Param('id') id: string) {
    return this.adminService.getCompliance(id);
  }

  @Post('compliance')
  createCompliance(@Body() data: Prisma.ComplianceItemCreateInput) {
    return this.adminService.createCompliance(data);
  }

  @Patch('compliance/:id')
  updateCompliance(@Param('id') id: string, @Body() data: Prisma.ComplianceItemUpdateInput) {
    return this.adminService.updateCompliance(id, data);
  }

  @Delete('compliance/:id')
  deleteCompliance(@Param('id') id: string) {
    return this.adminService.deleteCompliance(id);
  }

  // Partners
  @Get('partners')
  listPartners() {
    return this.adminService.listPartners();
  }

  @Get('partners/:id')
  getPartner(@Param('id') id: string) {
    return this.adminService.getPartner(id);
  }

  @Post('partners')
  createPartner(@Body() data: Prisma.PartnerLogoCreateInput) {
    return this.adminService.createPartner(data);
  }

  @Patch('partners/:id')
  updatePartner(@Param('id') id: string, @Body() data: Prisma.PartnerLogoUpdateInput) {
    return this.adminService.updatePartner(id, data);
  }

  @Delete('partners/:id')
  deletePartner(@Param('id') id: string) {
    return this.adminService.deletePartner(id);
  }

  // Content Blocks
  @Get('content-blocks')
  listContentBlocks() {
    return this.adminService.listContentBlocks();
  }

  @Get('content-blocks/:id')
  getContentBlock(@Param('id') id: string) {
    return this.adminService.getContentBlock(id);
  }

  @Post('content-blocks')
  createContentBlock(@Body() data: Prisma.ContentBlockCreateInput) {
    return this.adminService.createContentBlock(data);
  }

  @Patch('content-blocks/:id')
  updateContentBlock(@Param('id') id: string, @Body() data: Prisma.ContentBlockUpdateInput) {
    return this.adminService.updateContentBlock(id, data);
  }

  @Delete('content-blocks/:id')
  deleteContentBlock(@Param('id') id: string) {
    return this.adminService.deleteContentBlock(id);
  }

  // Estates
  @Get('estates')
  listEstates(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.adminService.listEstates({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @Get('estates/:id')
  getEstate(@Param('id') id: string) {
    return this.adminService.getEstate(id);
  }

  @Post('estates')
  createEstate(@Body() data: any) {
    return this.adminService.createEstate(data);
  }

  @Patch('estates/:id')
  updateEstate(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateEstate(id, data);
  }

  @Delete('estates/:id')
  deleteEstate(@Param('id') id: string) {
    return this.adminService.deleteEstate(id);
  }

  // Team Members
  @Get('team')
  listTeamMembers() {
    return this.adminService.listTeamMembers();
  }

  @Get('team/:id')
  getTeamMember(@Param('id') id: string) {
    return this.adminService.getTeamMember(id);
  }

  @Post('team')
  createTeamMember(@Body() data: Prisma.TeamMemberCreateInput) {
    return this.adminService.createTeamMember(data);
  }

  @Patch('team/:id')
  updateTeamMember(@Param('id') id: string, @Body() data: Prisma.TeamMemberUpdateInput) {
    return this.adminService.updateTeamMember(id, data);
  }

  @Delete('team/:id')
  deleteTeamMember(@Param('id') id: string) {
    return this.adminService.deleteTeamMember(id);
  }

  // Testimonials
  @Get('testimonials')
  listTestimonials() {
    return this.adminService.listTestimonials();
  }

  @Get('testimonials/:id')
  getTestimonial(@Param('id') id: string) {
    return this.adminService.getTestimonial(id);
  }

  @Post('testimonials')
  createTestimonial(@Body() data: Prisma.TestimonialCreateInput) {
    return this.adminService.createTestimonial(data);
  }

  @Patch('testimonials/:id')
  updateTestimonial(@Param('id') id: string, @Body() data: Prisma.TestimonialUpdateInput) {
    return this.adminService.updateTestimonial(id, data);
  }

  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id') id: string) {
    return this.adminService.deleteTestimonial(id);
  }

  @Get('newsletter')
  listSubscribers() {
    return this.adminService.listSubscribers();
  }

  // Leads
  @Get('leads')
  async listLeads(
    @Query('type') type?: string,
    @Query('enquiryType') enquiryType?: string,
    @Query('officeState') officeState?: string,
    @Query('propertyId') propertyId?: string,
    @Query('search') search?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('format') format?: string,
    @Res({ passthrough: true }) res?: Response,
  ) {
    const leads = await this.adminService.listLeads({
      type,
      enquiryType,
      officeState,
      propertyId,
      search,
      dateFrom,
      dateTo,
    });

    if (format === 'csv' && res) {
      const rows = leads.map((lead) => [
        lead.id,
        lead.fullName,
        lead.email,
        lead.phone || '',
        lead.type,
        lead.enquiryType || '',
        lead.officeState || '',
        lead.message?.replace(/"/g, '""') || '',
        lead.createdAt.toISOString(),
      ]);
      const csv = [
        [
          'id',
          'fullName',
          'email',
          'phone',
          'type',
          'enquiryType',
          'officeState',
          'message',
          'createdAt',
        ].join(','),
        ...rows.map((row) => row.map((value) => `"${value}"`).join(',')),
      ].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
      return res.send(csv);
    }

    return leads;
  }
}
