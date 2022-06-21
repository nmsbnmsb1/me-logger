import log4js from 'log4js';
export declare const Adapter: {
    Console: (config: any) => any;
    File: (config: any) => any;
    DateFile: (config: any) => any;
    Gelf: (config: any) => any;
};
export declare const Layout: {
    default: {
        type: string;
        pattern: string;
    };
};
export declare class Config {
    static Levels: string;
    static Appenders: string;
    static Categories: string;
    static PM2: string;
    static PM2InstanceVar: string;
    static DisableClustering: string;
    private static c;
    static setAppender(key: string, c: any, mode?: 'merge' | 'override', apply?: boolean): void;
    static setCategorie(key: string, c: any, mode?: 'merge' | 'override', apply?: boolean): void;
    static set(key: string, c: any, mode?: 'merge' | 'override', apply?: boolean): void;
    static setLayoutPattern(key?: string, pattern?: string, apply?: boolean): void;
    static setCategoryLevel(key?: string, level?: string, apply?: boolean): void;
    static getC(): any;
    static apply(): void;
    static reset(): void;
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
