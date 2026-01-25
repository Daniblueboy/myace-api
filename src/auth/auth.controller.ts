import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password?: string; pass?: string }) {
    const password = body.password || body.pass || '';
    const user = await this.authService.validateUser(body.email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'refreshSecret';
    const payload = this.jwtService.verify(body.refreshToken, { secret });
    return this.authService.refreshTokens(payload.sub, body.refreshToken);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.sub);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req: any) {
    const user = await this.usersService.findById(req.user.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      themePreference: user.themePreference,
    };
  }

  @Post('theme')
  @UseGuards(AuthGuard('jwt'))
  async updateTheme(@Req() req: any, @Body() body: { themePreference: string }) {
    const updated = await this.usersService.updateThemePreference(
      req.user.sub,
      body.themePreference,
    );
    return { themePreference: updated.themePreference };
  }
}
