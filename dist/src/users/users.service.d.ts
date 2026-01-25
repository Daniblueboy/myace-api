import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    updateRefreshTokenHash(userId: string, refreshToken: string): Promise<{
        id: string;
        email: string;
        name: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        themePreference: string;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    clearRefreshTokenHash(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        themePreference: string;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateThemePreference(userId: string, themePreference: string): Promise<{
        id: string;
        email: string;
        name: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        themePreference: string;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
