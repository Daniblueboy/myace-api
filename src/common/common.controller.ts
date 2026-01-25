import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { Prisma, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('faqs')
  findAllFAQs() {
    return this.commonService.findAllFAQs();
  }

  @Post('faqs')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  createFAQ(@Body() createFAQDto: Prisma.GeneralFAQCreateInput) {
    return this.commonService.createFAQ(createFAQDto);
  }

  @Patch('faqs/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  updateFAQ(
    @Param('id') id: string,
    @Body() updateFAQDto: Prisma.GeneralFAQUpdateInput,
  ) {
    return this.commonService.updateFAQ(id, updateFAQDto);
  }

  @Delete('faqs/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  removeFAQ(@Param('id') id: string) {
    return this.commonService.removeFAQ(id);
  }

  // Offices
  @Get('offices')
  findAllOffices() {
    return this.commonService.findAllOffices();
  }

  @Post('offices')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  createOffice(@Body() createOfficeDto: Prisma.OfficeLocationCreateInput) {
    return this.commonService.createOffice(createOfficeDto);
  }

  @Patch('offices/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  updateOffice(
    @Param('id') id: string,
    @Body() updateOfficeDto: Prisma.OfficeLocationUpdateInput,
  ) {
    return this.commonService.updateOffice(id, updateOfficeDto);
  }

  @Delete('offices/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  removeOffice(@Param('id') id: string) {
    return this.commonService.removeOffice(id);
  }
}
