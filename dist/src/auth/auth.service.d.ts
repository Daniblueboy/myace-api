import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
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
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
}
