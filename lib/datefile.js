"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => {
    let { level, filename, pattern, alwaysIncludePattern, absolute, layout } = config;
    level = level ? level.toUpperCase() : 'ALL';
    return Object.assign({
        appenders: {
            dateFile: { type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout },
        },
        categories: {
            default: { appenders: ['dateFile'], level },
        },
    }, config);
};
//# sourceMappingURL=datefile.js.map