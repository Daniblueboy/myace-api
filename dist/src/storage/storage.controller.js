"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const storage_service_1 = require("./storage.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME = ['image/', 'application/pdf', 'video/'];
let StorageController = class StorageController {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async upload(file, folder) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        return this.storageService.upload(file, folder);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter: (_req, file, cb) => {
            const isAllowed = ALLOWED_MIME.some((prefix) => file.mimetype.startsWith(prefix));
            if (!isAllowed) {
                return cb(new common_1.BadRequestException('Unsupported file type'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "upload", null);
exports.StorageController = StorageController = __decorate([
    (0, common_1.Controller)('admin/uploads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map