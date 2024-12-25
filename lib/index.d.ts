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
export declare const Config: {
    Levels: string;
    Appenders: string;
    Categories: string;
    PM2: string;
    PM2InstanceVar: string;
    DisableClustering: string;
    reset(): void;
    apply(): void;
    set(keyPath: string, c: any, mode?: "merge" | "override", apply?: boolean): void;
    setLayoutPattern(appenderKey?: string, pattern?: string, apply?: boolean): void;
    setCategoryLevel(categoryKey?: string, level?: string, apply?: boolean): void;
};
export declare class Logger {
    logger: log4js.Logger;
    category: any;
    constructor(category?: any);
    setCategory(category: any): this;
    isLevelEnabled(level: string): boolean;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    mark(message: any, ...args: any[]): void;
}
