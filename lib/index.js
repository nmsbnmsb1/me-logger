"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const console_1 = __importDefault(require("./console"));
const file_1 = __importDefault(require("./file"));
const datefile_1 = __importDefault(require("./datefile"));
const gelf_1 = __importDefault(require("./gelf"));
class Logger {
    constructor(adapter, config = {}, category) {
        this.adapter = adapter || console_1.default;
        this.setLogger(config, category);
    }
    setLogger(config, category) {
        this.config = this.adapter(config);
        log4js_1.default.configure(this.config);
        this.logger = log4js_1.default.getLogger(category);
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
exports.default = Logger;
Logger.Console = console_1.default;
Logger.File = file_1.default;
Logger.DateFile = datefile_1.default;
Logger.Gelf = gelf_1.default;
//# sourceMappingURL=index.js.map