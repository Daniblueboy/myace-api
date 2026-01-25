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
import { BlogService } from './blog.service';
import { Prisma, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createBlogDto: Prisma.BlogPostCreateInput) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    const where: Prisma.BlogPostWhereInput = {
      published: true, // Default to published only for public
    };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const parsedSkip = skip ? Number(skip) : undefined;
    const parsedTake = take ? Number(take) : undefined;
    return Promise.all([
      this.blogService.findAll({
        skip: parsedSkip,
        take: parsedTake,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.blogService.count(where),
    ]).then(([items, total]) => ({ items, total }));
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  findAllAdmin(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.blogService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: Prisma.BlogPostUpdateInput,
  ) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
