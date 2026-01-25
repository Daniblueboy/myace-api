"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("prisma/config");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
exports.default = (0, config_1.defineConfig)({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'ts-node prisma/seed.ts',
    },
    datasource: {
        url: process.env['DATABASE_URL'],
    },
});
//# sourceMappingURL=prisma.config.js.map