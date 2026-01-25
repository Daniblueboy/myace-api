import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BlogPostCreateInput) {
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
    return this.prisma.blogPost.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogPostWhereUniqueInput;
    where?: Prisma.BlogPostWhereInput;
    orderBy?: Prisma.BlogPostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.blogPost.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { categories: true, tags: true },
    });
  }

  async count(where?: Prisma.BlogPostWhereInput) {
    return this.prisma.blogPost.count({ where });
  }

  async findOne(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { categories: true, tags: true },
    });
    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`);
    }
    return post;
  }

  async update(id: string, data: Prisma.BlogPostUpdateInput) {
    return this.prisma.blogPost.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }
}
