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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const client_1 = require("@prisma/client");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    listProperties(skip, take, type, status, state, search) {
        return this.adminService.listProperties({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            type,
            status,
            state,
            search,
        });
    }
    getProperty(id) {
        return this.adminService.getProperty(id);
    }
    createProperty(data) {
        return this.adminService.createProperty(data);
    }
    updateProperty(id, data) {
        return this.adminService.updateProperty(id, data);
    }
    deleteProperty(id) {
        return this.adminService.deleteProperty(id);
    }
    listBlog(skip, take) {
        return this.adminService.listBlog({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
        });
    }
    getBlog(id) {
        return this.adminService.getBlog(id);
    }
    createBlog(data) {
        return this.adminService.createBlog(data);
    }
    updateBlog(id, data) {
        return this.adminService.updateBlog(id, data);
    }
    deleteBlog(id) {
        return this.adminService.deleteBlog(id);
    }
    listFAQs() {
        return this.adminService.listFAQs();
    }
    getFAQ(id) {
        return this.adminService.getFAQ(id);
    }
    createFAQ(data) {
        return this.adminService.createFAQ(data);
    }
    updateFAQ(id, data) {
        return this.adminService.updateFAQ(id, data);
    }
    deleteFAQ(id) {
        return this.adminService.deleteFAQ(id);
    }
    listOffices() {
        return this.adminService.listOffices();
    }
    getOffice(id) {
        return this.adminService.getOffice(id);
    }
    createOffice(data) {
        return this.adminService.createOffice(data);
    }
    updateOffice(id, data) {
        return this.adminService.updateOffice(id, data);
    }
    deleteOffice(id) {
        return this.adminService.deleteOffice(id);
    }
    listResources() {
        return this.adminService.listResources();
    }
    getResource(id) {
        return this.adminService.getResource(id);
    }
    createResource(data) {
        return this.adminService.createResource(data);
    }
    updateResource(id, data) {
        return this.adminService.updateResource(id, data);
    }
    deleteResource(id) {
        return this.adminService.deleteResource(id);
    }
    listPromos() {
        return this.adminService.listPromos();
    }
    getPromo(id) {
        return this.adminService.getPromo(id);
    }
    createPromo(data) {
        return this.adminService.createPromo(data);
    }
    updatePromo(id, data) {
        return this.adminService.updatePromo(id, data);
    }
    deletePromo(id) {
        return this.adminService.deletePromo(id);
    }
    listCompliance() {
        return this.adminService.listCompliance();
    }
    getCompliance(id) {
        return this.adminService.getCompliance(id);
    }
    createCompliance(data) {
        return this.adminService.createCompliance(data);
    }
    updateCompliance(id, data) {
        return this.adminService.updateCompliance(id, data);
    }
    deleteCompliance(id) {
        return this.adminService.deleteCompliance(id);
    }
    listPartners() {
        return this.adminService.listPartners();
    }
    getPartner(id) {
        return this.adminService.getPartner(id);
    }
    createPartner(data) {
        return this.adminService.createPartner(data);
    }
    updatePartner(id, data) {
        return this.adminService.updatePartner(id, data);
    }
    deletePartner(id) {
        return this.adminService.deletePartner(id);
    }
    listContentBlocks() {
        return this.adminService.listContentBlocks();
    }
    getContentBlock(id) {
        return this.adminService.getContentBlock(id);
    }
    createContentBlock(data) {
        return this.adminService.createContentBlock(data);
    }
    updateContentBlock(id, data) {
        return this.adminService.updateContentBlock(id, data);
    }
    deleteContentBlock(id) {
        return this.adminService.deleteContentBlock(id);
    }
    listEstates(skip, take) {
        return this.adminService.listEstates({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
        });
    }
    getEstate(id) {
        return this.adminService.getEstate(id);
    }
    createEstate(data) {
        return this.adminService.createEstate(data);
    }
    updateEstate(id, data) {
        return this.adminService.updateEstate(id, data);
    }
    deleteEstate(id) {
        return this.adminService.deleteEstate(id);
    }
    listTeamMembers() {
        return this.adminService.listTeamMembers();
    }
    getTeamMember(id) {
        return this.adminService.getTeamMember(id);
    }
    createTeamMember(data) {
        return this.adminService.createTeamMember(data);
    }
    updateTeamMember(id, data) {
        return this.adminService.updateTeamMember(id, data);
    }
    deleteTeamMember(id) {
        return this.adminService.deleteTeamMember(id);
    }
    listTestimonials() {
        return this.adminService.listTestimonials();
    }
    getTestimonial(id) {
        return this.adminService.getTestimonial(id);
    }
    createTestimonial(data) {
        return this.adminService.createTestimonial(data);
    }
    updateTestimonial(id, data) {
        return this.adminService.updateTestimonial(id, data);
    }
    deleteTestimonial(id) {
        return this.adminService.deleteTestimonial(id);
    }
    listSubscribers() {
        return this.adminService.listSubscribers();
    }
    async listLeads(type, enquiryType, officeState, propertyId, search, dateFrom, dateTo, format, res) {
        const leads = await this.adminService.listLeads({
            type,
            enquiryType,
            officeState,
            propertyId,
            search,
            dateFrom,
            dateTo,
        });
        if (format === 'csv' && res) {
            const rows = leads.map((lead) => [
                lead.id,
                lead.fullName,
                lead.email,
                lead.phone || '',
                lead.type,
                lead.enquiryType || '',
                lead.officeState || '',
                lead.message?.replace(/"/g, '""') || '',
                lead.createdAt.toISOString(),
            ]);
            const csv = [
                [
                    'id',
                    'fullName',
                    'email',
                    'phone',
                    'type',
                    'enquiryType',
                    'officeState',
                    'message',
                    'createdAt',
                ].join(','),
                ...rows.map((row) => row.map((value) => `"${value}"`).join(',')),
            ].join('\n');
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
            return res.send(csv);
        }
        return leads;
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('properties'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('state')),
    __param(5, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listProperties", null);
__decorate([
    (0, common_1.Get)('properties/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getProperty", null);
__decorate([
    (0, common_1.Post)('properties'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createProperty", null);
__decorate([
    (0, common_1.Patch)('properties/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateProperty", null);
__decorate([
    (0, common_1.Delete)('properties/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteProperty", null);
__decorate([
    (0, common_1.Get)('blog'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listBlog", null);
__decorate([
    (0, common_1.Get)('blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Post)('blog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Patch)('blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)('blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)('faqs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listFAQs", null);
__decorate([
    (0, common_1.Get)('faqs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getFAQ", null);
__decorate([
    (0, common_1.Post)('faqs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createFAQ", null);
__decorate([
    (0, common_1.Patch)('faqs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateFAQ", null);
__decorate([
    (0, common_1.Delete)('faqs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteFAQ", null);
__decorate([
    (0, common_1.Get)('offices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listOffices", null);
__decorate([
    (0, common_1.Get)('offices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getOffice", null);
__decorate([
    (0, common_1.Post)('offices'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createOffice", null);
__decorate([
    (0, common_1.Patch)('offices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateOffice", null);
__decorate([
    (0, common_1.Delete)('offices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteOffice", null);
__decorate([
    (0, common_1.Get)('resources'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listResources", null);
__decorate([
    (0, common_1.Get)('resources/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getResource", null);
__decorate([
    (0, common_1.Post)('resources'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createResource", null);
__decorate([
    (0, common_1.Patch)('resources/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Delete)('resources/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteResource", null);
__decorate([
    (0, common_1.Get)('promos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listPromos", null);
__decorate([
    (0, common_1.Get)('promos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPromo", null);
__decorate([
    (0, common_1.Post)('promos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createPromo", null);
__decorate([
    (0, common_1.Patch)('promos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePromo", null);
__decorate([
    (0, common_1.Delete)('promos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deletePromo", null);
__decorate([
    (0, common_1.Get)('compliance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listCompliance", null);
__decorate([
    (0, common_1.Get)('compliance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCompliance", null);
__decorate([
    (0, common_1.Post)('compliance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createCompliance", null);
__decorate([
    (0, common_1.Patch)('compliance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCompliance", null);
__decorate([
    (0, common_1.Delete)('compliance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteCompliance", null);
__decorate([
    (0, common_1.Get)('partners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listPartners", null);
__decorate([
    (0, common_1.Get)('partners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPartner", null);
__decorate([
    (0, common_1.Post)('partners'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createPartner", null);
__decorate([
    (0, common_1.Patch)('partners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePartner", null);
__decorate([
    (0, common_1.Delete)('partners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deletePartner", null);
__decorate([
    (0, common_1.Get)('content-blocks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listContentBlocks", null);
__decorate([
    (0, common_1.Get)('content-blocks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getContentBlock", null);
__decorate([
    (0, common_1.Post)('content-blocks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createContentBlock", null);
__decorate([
    (0, common_1.Patch)('content-blocks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateContentBlock", null);
__decorate([
    (0, common_1.Delete)('content-blocks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteContentBlock", null);
__decorate([
    (0, common_1.Get)('estates'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listEstates", null);
__decorate([
    (0, common_1.Get)('estates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEstate", null);
__decorate([
    (0, common_1.Post)('estates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createEstate", null);
__decorate([
    (0, common_1.Patch)('estates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateEstate", null);
__decorate([
    (0, common_1.Delete)('estates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteEstate", null);
__decorate([
    (0, common_1.Get)('team'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listTeamMembers", null);
__decorate([
    (0, common_1.Get)('team/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTeamMember", null);
__decorate([
    (0, common_1.Post)('team'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createTeamMember", null);
__decorate([
    (0, common_1.Patch)('team/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTeamMember", null);
__decorate([
    (0, common_1.Delete)('team/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteTeamMember", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listTestimonials", null);
__decorate([
    (0, common_1.Get)('testimonials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTestimonial", null);
__decorate([
    (0, common_1.Post)('testimonials'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createTestimonial", null);
__decorate([
    (0, common_1.Patch)('testimonials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTestimonial", null);
__decorate([
    (0, common_1.Delete)('testimonials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteTestimonial", null);
__decorate([
    (0, common_1.Get)('newsletter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listSubscribers", null);
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('enquiryType')),
    __param(2, (0, common_1.Query)('officeState')),
    __param(3, (0, common_1.Query)('propertyId')),
    __param(4, (0, common_1.Query)('search')),
    __param(5, (0, common_1.Query)('dateFrom')),
    __param(6, (0, common_1.Query)('dateTo')),
    __param(7, (0, common_1.Query)('format')),
    __param(8, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listLeads", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map