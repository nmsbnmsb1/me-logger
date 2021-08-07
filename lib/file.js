"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => {
    let { level, filename, maxLogSize, backups, absolute, layout } = config;
    level = level ? level.toUpperCase() : 'ALL';
    return Object.assign({
        appenders: {
            file: { type: 'file', filename, maxLogSize, backups, absolute, layout },
        },
        categories: {
            default: { appenders: ['file'], level },
        },
    }, config);
};
//# sourceMappingURL=file.js.map