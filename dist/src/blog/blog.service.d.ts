import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.BlogPostCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImageUrl: string | null;
        published: boolean;
        publishedAt: Date | null;
    }>;
    findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BlogPostWhereUniqueInput;
        where?: Prisma.BlogPostWhereInput;
        orderBy?: Prisma.BlogPostOrderByWithRelationInput;
    }): Promise<({
        categories: {
            id: string;
            name: string;
        }[];
        tags: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImageUrl: string | null;
        published: boolean;
        publishedAt: Date | null;
    })[]>;
    count(where?: Prisma.BlogPostWhereInput): Promise<number>;
    findOne(slug: string): Promise<{
        categories: {
            id: string;
            name: string;
        }[];
        tags: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImageUrl: string | null;
        published: boolean;
        publishedAt: Date | null;
    }>;
    update(id: string, data: Prisma.BlogPostUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImageUrl: string | null;
        published: boolean;
        publishedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        excerpt: string | null;
        content: string;
        coverImageUrl: string | null;
        published: boolean;
        publishedAt: Date | null;
    }>;
}
