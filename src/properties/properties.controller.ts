import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Prisma, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createPropertyDto: Prisma.PropertyCreateInput) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('state') state?: string,
    @Query('city') city?: string,
    @Query('bedrooms') bedrooms?: string,
    @Query('priceMin') priceMin?: string,
    @Query('priceMax') priceMax?: string,
    @Query('sort') sort?: string,
    @Query('featured') featured?: string,
    @Query('search') search?: string,
    @Query('estateId') estateId?: string,
    @Query('estateSlug') estateSlug?: string,
  ) {
    const where: Prisma.PropertyWhereInput = {};
    if (type) where.type = type as any; // Cast safely or validate
    if (status) where.status = status as any;
    if (state) where.state = { contains: state, mode: 'insensitive' };
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (bedrooms) where.bedrooms = Number(bedrooms);
    if (featured !== undefined) where.featured = featured === 'true';
    if (estateId) where.estateId = estateId;
    if (!estateId && estateSlug) where.estate = { slug: estateSlug };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price.gte = Number(priceMin);
      if (priceMax) where.price.lte = Number(priceMax);
    }

    let orderBy: Prisma.PropertyOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    return this.propertiesService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy,
    });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.propertiesService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: Prisma.PropertyUpdateInput,
  ) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
