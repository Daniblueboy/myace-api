import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hash },
    });
  }

  async clearRefreshTokenHash(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
    });
  }

  async updateThemePreference(userId: string, themePreference: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { themePreference },
    });
  }
}
