"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.Config = exports.Adapter = exports.Layout = void 0;
const log4js_1 = __importDefault(require("log4js"));
const me_utils_1 = require("me-utils");
exports.Layout = {
    default: { type: 'pattern', pattern: `%[[%d] [%z] [%p]%] - %m` },
};
exports.Adapter = {
    Console: (config) => {
        let { level, layout } = config;
        level = level ? level.toUpperCase() : 'ALL';
        layout = layout || { ...exports.Layout.default };
        return Object.assign({
            appenders: { console: { type: 'console', layout } },
            categories: { default: { appenders: ['console'], level } },
        }, config);
    },
    File: (config) => {
        let { level, filename, maxLogSize, backups, absolute, layout } = config;
        level = level ? level.toUpperCase() : 'ALL';
        return Object.assign({
            appenders: { file: { type: 'file', filename, maxLogSize, backups, absolute, layout } },
            categories: { default: { appenders: ['file'], level } },
        }, config);
    },
    DateFile: (config) => {
        let { level, filename, pattern, alwaysIncludePattern, absolute, layout } = config;
        level = level ? level.toUpperCase() : 'ALL';
        return Object.assign({
            appenders: { dateFile: { type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout } },
            categories: { default: { appenders: ['dateFile'], level } },
        }, config);
    },
    Gelf: (config) => {
        const { level, host, hostname, port, facility } = config;
        return Object.assign({
            appenders: { gelf: { type: 'gelf', host, hostname, port, facility } },
            categories: { default: { appenders: ['gelf'], level } },
        }, config);
    },
};
class Config {
    static reset() {
        Config.c = {
            appenders: { console: { type: 'console', layout: { ...exports.Layout.default } } },
            categories: { default: { appenders: ['console'], level: 'INFO' } },
        };
        Config.apply();
    }
    static apply() {
        log4js_1.default.configure(Config.c);
    }
    static getTarget(keyPath) {
        let target = Config.c;
        let tmp = keyPath.split('.');
        for (let i = 0; i <= tmp.length - 2; i++) {
            let key = tmp[i];
            if (target[key]) {
                target = target[key];
            }
            else {
                target = undefined;
                break;
            }
        }
        return target ? { target, key: tmp[tmp.length - 1] } : undefined;
    }
    static set(keyPath, c, mode = 'merge', apply = true) {
        let t = Config.getTarget(keyPath);
        if (!t)
            return;
        let { target, key } = t;
        if (!c)
            delete target[key];
        else {
            if (mode === 'merge')
                target[key] = me_utils_1.ObjectUtils.extend(target[key], c);
            else
                target[key] = c;
        }
        if (apply)
            Config.apply();
    }
    static setLayoutPattern(appenderKey = 'console', pattern = `%[[%d] [%z] [%p]%] - %m`, apply = true) {
        Config.set(`${Config.Appenders}.${appenderKey}.layout.pattern`, pattern, 'override', apply);
    }
    static setCategoryLevel(categoryKey = 'default', level = `INFO`, apply = true) {
        Config.set(`${Config.Categories}.${categoryKey}.level`, level, 'override', apply);
    }
}
exports.Config = Config;
Config.Levels = 'levels';
Config.Appenders = 'appenders';
Config.Categories = 'categories';
Config.PM2 = 'pm2';
Config.PM2InstanceVar = 'pm2InstanceVar';
Config.DisableClustering = 'disableClustering';
Config.reset();
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