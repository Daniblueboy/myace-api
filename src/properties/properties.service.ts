import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Property, PropertyType, PropertyStatus } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PropertyCreateInput) {
    // Generate slug from title if not provided (simple version)
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
    return this.prisma.property.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PropertyWhereUniqueInput;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.property.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { images: true, estate: true },
    });
  }

  async findOne(slug: string) {
    const property = await this.prisma.property.findUnique({
      where: { slug },
      include: {
        images: true,
        faqs: true,
        resources: true,
        variants: { orderBy: { sortOrder: 'asc' } },
        media: { orderBy: { sortOrder: 'asc' } },
        estate: true,
      },
    });
    if (!property) {
      throw new NotFoundException(`Property with slug ${slug} not found`);
    }
    return property;
  }

  async update(id: string, data: Prisma.PropertyUpdateInput) {
    return this.prisma.property.update({
      where: { id },
      data,
      include: { images: true },
    });
  }

  async remove(id: string) {
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
