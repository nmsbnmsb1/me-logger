export default class Logger {
    static Console: (config: any) => any;
    static File: (config: any) => any;
    static DateFile: (config: any) => any;
    static Gelf: (config: any) => any;
    private adapter;
    private config;
    private logger;
    constructor(adapter?: any, config?: any, category?: any);
    setLogger(config: any, category?: any): void;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    mark(message: any, ...args: any[]): void;
}
