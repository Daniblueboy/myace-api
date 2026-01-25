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
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const common_service_1 = require("./common.service");
const client_1 = require("@prisma/client");
let PublicController = class PublicController {
    commonService;
    constructor(commonService) {
        this.commonService = commonService;
    }
    findAllFAQs() {
        return this.commonService.findAllFAQs();
    }
    findAllOffices() {
        return this.commonService.findAllOffices();
    }
    findAllResources(search, estateId, estateSlug) {
        return this.commonService.findAllResources({ search, estateId, estateSlug });
    }
    findActivePromos(placement) {
        return this.commonService.findActivePromos({ placement });
    }
    findActiveCompliance(displayOnHome) {
        if (displayOnHome === undefined) {
            return this.commonService.findActiveCompliance();
        }
        return this.commonService.findActiveCompliance(displayOnHome === 'true');
    }
    findActivePartners() {
        return this.commonService.findActivePartners();
    }
    findContentBlocks(section) {
        return this.commonService.findContentBlocks().then((blocks) => {
            const activeBlocks = blocks.filter((block) => block.active);
            if (!section) {
                return activeBlocks;
            }
            return activeBlocks.filter((block) => block.section === section);
        });
    }
    findEstates(skip, take) {
        const parsedSkip = skip ? Number(skip) : undefined;
        const parsedTake = take ? Number(take) : undefined;
        return Promise.all([
            this.commonService.findEstates({ skip: parsedSkip, take: parsedTake }),
            this.commonService.countEstates(),
        ]).then(([items, total]) => ({ items, total }));
    }
    findEstateBySlug(slug) {
        return this.commonService.findEstateBySlug(slug);
    }
    findTeamMembers() {
        return this.commonService.findActiveTeamMembers();
    }
    findTestimonials() {
        return this.commonService.findActiveTestimonials();
    }
    createLead(data) {
        return this.commonService.createLead(data);
    }
    subscribe(body) {
        return this.commonService.createSubscriber(body.email);
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Get)('faqs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findAllFAQs", null);
__decorate([
    (0, common_1.Get)('offices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findAllOffices", null);
__decorate([
    (0, common_1.Get)('resources'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('estateId')),
    __param(2, (0, common_1.Query)('estateSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findAllResources", null);
__decorate([
    (0, common_1.Get)('promos'),
    __param(0, (0, common_1.Query)('placement')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findActivePromos", null);
__decorate([
    (0, common_1.Get)('compliance'),
    __param(0, (0, common_1.Query)('displayOnHome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findActiveCompliance", null);
__decorate([
    (0, common_1.Get)('partners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findActivePartners", null);
__decorate([
    (0, common_1.Get)('content-blocks'),
    __param(0, (0, common_1.Query)('section')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findContentBlocks", null);
__decorate([
    (0, common_1.Get)('estates'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findEstates", null);
__decorate([
    (0, common_1.Get)('estates/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findEstateBySlug", null);
__decorate([
    (0, common_1.Get)('team'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findTeamMembers", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "findTestimonials", null);
__decorate([
    (0, common_1.Post)('leads'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "createLead", null);
__decorate([
    (0, common_1.Post)('newsletter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "subscribe", null);
exports.PublicController = PublicController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [common_service_1.CommonService])
], PublicController);
//# sourceMappingURL=public.controller.js.map