import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    login(body: {
        email: string;
        password?: string;
        pass?: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            themePreference: any;
        };
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<{
        success: boolean;
    }>;
    me(req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        themePreference: string;
    }>;
    updateTheme(req: any, body: {
        themePreference: string;
    }): Promise<{
        themePreference: string;
    }>;
}
