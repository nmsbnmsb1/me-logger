"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.Config = exports.Layout = exports.Adapter = void 0;
const log4js_1 = __importDefault(require("log4js"));
const me_utils_1 = require("me-utils");
exports.Adapter = {
    Console: (config) => {
        let { level, layout } = config;
        level = level ? level.toUpperCase() : 'ALL';
        layout = layout || Object.assign({}, exports.Layout.default);
        return Object.assign({
            appenders: {
                console: { type: 'console', layout },
            },
            categories: {
                default: { appenders: ['console'], level },
            },
        }, config);
    },
    File: (config) => {
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
    },
    DateFile: (config) => {
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
    },
    Gelf: (config) => {
        const { level, host, hostname, port, facility } = config;
        return Object.assign({
            appenders: {
                gelf: { type: 'gelf', host, hostname, port, facility },
            },
            categories: {
                default: { appenders: ['gelf'], level },
            },
        }, config);
    },
};
exports.Layout = {
    default: { type: 'pattern', pattern: `%[[%d] [%z] [%p]%] - %m` },
};
class Config {
    static setAppender(key, c, mode = 'merge', apply = true) {
        if (!c)
            delete Config.c.appenders[key];
        else if (mode === 'merge')
            Config.c.appenders[key] = me_utils_1.ObjectUtils.extend(Config.c.appenders[key], c);
        else
            Config.c.appenders[key] = c;
        if (apply)
            Config.apply();
    }
    static setCategorie(key, c, mode = 'merge', apply = true) {
        if (!c) {
            if (key !== 'default')
                delete Config.c.categories[key];
        }
        else if (mode === 'merge')
            Config.c.categories[key] = me_utils_1.ObjectUtils.extend(Config.c.categories[key], c);
        else
            Config.c.categories[key] = c;
        if (apply)
            Config.apply();
    }
    static set(key, c, mode = 'merge', apply = true) {
        if (mode === 'merge')
            Config.c[key] = me_utils_1.ObjectUtils.extend(Config.c[key], c);
        else
            Config.c[key] = c;
        if (apply)
            Config.apply();
    }
    static setLayoutPattern(key = 'console', pattern = `%[[%d] [%z] [%p]%] - %m`, apply = true) {
        if (Config.c.appenders[key] && Config.c.appenders[key].layout) {
            Config.c.appenders[key].layout.pattern = pattern;
            if (apply)
                Config.apply();
        }
    }
    static setCategoryLevel(key = 'default', level = `INFO`, apply = true) {
        if (Config.c.categories[key]) {
            Config.c.categories[key].level = level;
            if (apply)
                Config.apply();
        }
    }
    static getC() {
        return Config.c;
    }
    static apply() {
        log4js_1.default.configure(Config.c);
    }
    static reset() {
        Config.c = {
            appenders: { console: { type: 'console', layout: Object.assign({}, exports.Layout.default) } },
            categories: { default: { appenders: ['console'], level: 'INFO' } },
        };
        log4js_1.default.configure(Config.c);
    }
}
exports.Config = Config;
Config.Levels = 'levels';
Config.Appenders = 'appenders';
Config.Categories = 'categories';
Config.PM2 = 'pm2';
Config.PM2InstanceVar = 'pm2InstanceVar';
Config.DisableClustering = 'disableClustering';
Config.c = {
    appenders: { console: { type: 'console', layout: Object.assign({}, exports.Layout.default) } },
    categories: { default: { appenders: ['console'], level: 'INFO' } },
};
Config.apply();
class Logger {
    constructor(category) {
        this.category = category;
        this.logger = log4js_1.default.getLogger(this.category);
        return this;
    }
    setCategory(category) {
        this.category = category;
        this.logger = log4js_1.default.getLogger(this.category);
        return this;
    }
    trace(message, ...args) {
        this.logger.trace(message, ...args);
    }
    debug(message, ...args) {
        this.logger.debug(message, ...args);
    }
    info(message, ...args) {
        this.logger.info(message, ...args);
    }
    warn(message, ...args) {
        this.logger.warn(message, ...args);
    }
    error(message, ...args) {
        this.logger.error(message, ...args);
    }
    fatal(message, ...args) {
        this.logger.fatal(message, ...args);
    }
    mark(message, ...args) {
        this.logger.mark(message, ...args);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map