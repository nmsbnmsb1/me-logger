import log4js from 'log4js';
export default class Logger {
    static Console: (config: any) => any;
    static File: (config: any) => any;
    static DateFile: (config: any) => any;
    static Gelf: (config: any) => any;
    private adapter;
    private config;
    private logger;
    constructor(adapter?: any, config?: any);
    formatConfig(config: any): any;
    configure(config: any): log4js.Log4js;
    setLogger(config: any, category?: any): void;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
}
