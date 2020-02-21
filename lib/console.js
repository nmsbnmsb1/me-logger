"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => {
    let { title, level, layout } = config;
    level = level ? level.toUpperCase() : 'ALL';
    layout = layout || { type: 'pattern', pattern: `%[[%d] [${title || '%z'}] [%p]%] - %m` };
    return Object.assign({
        appenders: {
            console: { type: 'console', layout },
        },
        categories: {
            default: { appenders: ['console'], level },
        },
    }, config);
};
//# sourceMappingURL=console.js.map