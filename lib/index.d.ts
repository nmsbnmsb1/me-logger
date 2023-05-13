import log4js from 'log4js';
export declare const Layout: {
    default: {
        type: string;
        pattern: string;
    };
};
export declare const Adapter: {
    Console: (config: any) => any;
    File: (config: any) => any;
    DateFile: (config: any) => any;
    Gelf: (config: any) => any;
};
export declare class Config {
    static Levels: string;
    static Appenders: string;
    static Categories: string;
    static PM2: string;
    static PM2InstanceVar: string;
    static DisableClustering: string;
    private static c;
    static reset(): void;
    static apply(): void;
    private static getTarget;
    static set(keyPath: string, c: any, mode?: 'merge' | 'override', apply?: boolean): void;
    static setLayoutPattern(appenderKey?: string, pattern?: string, apply?: boolean): void;
    static setCategoryLevel(categoryKey?: string, level?: string, apply?: boolean): void;
}
export declare class Logger {
    logger: log4js.Logger;
    category: any;
    constructor(category?: any);
    setCategory(category: any): this;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    mark(message: any, ...args: any[]): void;
}
