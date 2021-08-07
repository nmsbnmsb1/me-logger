"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => {
    const { level, host, hostname, port, facility } = config;
    return Object.assign({
        appenders: {
            gelf: { type: 'gelf', host, hostname, port, facility },
        },
        categories: {
            default: { appenders: ['gelf'], level },
        },
    }, config);
};
//# sourceMappingURL=gelf.js.map