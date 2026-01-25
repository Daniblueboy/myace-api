import { BlogService } from './blog.service';
import { Prisma } from '@prisma/client';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: Prisma.BlogPostCreateInput): Promise<{
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
    findAll(skip?: string, take?: string, search?: string): Promise<{
        items: ({
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
        })[];
        total: number;
    }>;
    findAllAdmin(skip?: string, take?: string): Promise<({
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
    update(id: string, updateBlogDto: Prisma.BlogPostUpdateInput): Promise<{
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
