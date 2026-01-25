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
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const properties_service_1 = require("./properties.service");
const client_1 = require("@prisma/client");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let PropertiesController = class PropertiesController {
    propertiesService;
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    create(createPropertyDto) {
        return this.propertiesService.create(createPropertyDto);
    }
    findAll(skip, take, type, status, state, city, bedrooms, priceMin, priceMax, sort, featured, search, estateId, estateSlug) {
        const where = {};
        if (type)
            where.type = type;
        if (status)
            where.status = status;
        if (state)
            where.state = { contains: state, mode: 'insensitive' };
        if (city)
            where.city = { contains: city, mode: 'insensitive' };
        if (bedrooms)
            where.bedrooms = Number(bedrooms);
        if (featured !== undefined)
            where.featured = featured === 'true';
        if (estateId)
            where.estateId = estateId;
        if (!estateId && estateSlug)
            where.estate = { slug: estateSlug };
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (priceMin || priceMax) {
            where.price = {};
            if (priceMin)
                where.price.gte = Number(priceMin);
            if (priceMax)
                where.price.lte = Number(priceMax);
        }
        let orderBy = { createdAt: 'desc' };
        if (sort === 'price_asc')
            orderBy = { price: 'asc' };
        if (sort === 'price_desc')
            orderBy = { price: 'desc' };
        return this.propertiesService.findAll({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            where,
            orderBy,
        });
    }
    findOne(slug) {
        return this.propertiesService.findOne(slug);
    }
    update(id, updatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto);
    }
    remove(id) {
        return this.propertiesService.remove(id);
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('state')),
    __param(5, (0, common_1.Query)('city')),
    __param(6, (0, common_1.Query)('bedrooms')),
    __param(7, (0, common_1.Query)('priceMin')),
    __param(8, (0, common_1.Query)('priceMax')),
    __param(9, (0, common_1.Query)('sort')),
    __param(10, (0, common_1.Query)('featured')),
    __param(11, (0, common_1.Query)('search')),
    __param(12, (0, common_1.Query)('estateId')),
    __param(13, (0, common_1.Query)('estateSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "remove", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map