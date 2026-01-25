import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { CommonService } from './common.service';
import { Prisma } from '@prisma/client';

@Controller()
export class PublicController {
  constructor(private readonly commonService: CommonService) {}

  @Get('faqs')
  findAllFAQs() {
    return this.commonService.findAllFAQs();
  }

  @Get('offices')
  findAllOffices() {
    return this.commonService.findAllOffices();
  }

  @Get('resources')
  findAllResources(
    @Query('search') search?: string,
    @Query('estateId') estateId?: string,
    @Query('estateSlug') estateSlug?: string,
  ) {
    return this.commonService.findAllResources({ search, estateId, estateSlug });
  }

  @Get('promos')
  findActivePromos(@Query('placement') placement?: string) {
    return this.commonService.findActivePromos({ placement });
  }

  @Get('compliance')
  findActiveCompliance(@Query('displayOnHome') displayOnHome?: string) {
    if (displayOnHome === undefined) {
      return this.commonService.findActiveCompliance();
    }
    return this.commonService.findActiveCompliance(displayOnHome === 'true');
  }

  @Get('partners')
  findActivePartners() {
    return this.commonService.findActivePartners();
  }

  @Get('content-blocks')
  findContentBlocks(@Query('section') section?: string) {
    return this.commonService.findContentBlocks().then((blocks) => {
      const activeBlocks = blocks.filter((block: { active: boolean }) => block.active);
      if (!section) {
        return activeBlocks;
      }
      return activeBlocks.filter((block: { section: string }) => block.section === section);
    });
  }

  @Get('estates')
  findEstates(@Query('skip') skip?: string, @Query('take') take?: string) {
    const parsedSkip = skip ? Number(skip) : undefined;
    const parsedTake = take ? Number(take) : undefined;
    return Promise.all([
      this.commonService.findEstates({ skip: parsedSkip, take: parsedTake }),
      this.commonService.countEstates(),
    ]).then(([items, total]) => ({ items, total }));
  }

  @Get('estates/:slug')
  findEstateBySlug(@Param('slug') slug: string) {
    return this.commonService.findEstateBySlug(slug);
  }

  @Get('team')
  findTeamMembers() {
    return this.commonService.findActiveTeamMembers();
  }

  @Get('testimonials')
  findTestimonials() {
    return this.commonService.findActiveTestimonials();
  }

  @Post('leads')
  createLead(@Body() data: Prisma.LeadSubmissionUncheckedCreateInput) {
    return this.commonService.createLead(data);
  }

  @Post('newsletter')
  subscribe(@Body() body: { email: string }) {
    return this.commonService.createSubscriber(body.email);
  }
}
