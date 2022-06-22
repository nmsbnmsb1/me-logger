import log4js from 'log4js';
import { ObjectUtils } from 'me-utils';
//import rfdc from 'rfdc';
//const deepClone = rfdc({ proto: true });

export const Adapter = {
	Console: (config: any) => {
		let { level, layout } = config;
		level = level ? level.toUpperCase() : 'ALL';
		layout = layout || { ...Layout.default };

		return Object.assign(
			{
				appenders: { console: { type: 'console', layout } },
				categories: { default: { appenders: ['console'], level } },
			},
			config
		);
	},
	File: (config: any) => {
		// eslint-disable-next-line prefer-const
		let { level, filename, maxLogSize, backups, absolute, layout } = config;
		level = level ? level.toUpperCase() : 'ALL';

		// combine config for file appender, common config for log4js
		return Object.assign(
			{
				appenders: { file: { type: 'file', filename, maxLogSize, backups, absolute, layout } },
				categories: { default: { appenders: ['file'], level } },
			},
			config
		);
	},
	DateFile: (config: any) => {
		// eslint-disable-next-line prefer-const
		let { level, filename, pattern, alwaysIncludePattern, absolute, layout } = config;
		level = level ? level.toUpperCase() : 'ALL';

		return Object.assign(
			{
				appenders: { dateFile: { type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout } },
				categories: { default: { appenders: ['dateFile'], level } },
			},
			config
		);
	},
	Gelf: (config: any) => {
		const { level, host, hostname, port, facility } = config;
		return Object.assign(
			{
				appenders: { gelf: { type: 'gelf', host, hostname, port, facility } },
				categories: { default: { appenders: ['gelf'], level } },
			},
			config
		);
	},
};

export const Layout = {
	default: { type: 'pattern', pattern: `%[[%d] [%z] [%p]%] - %m` },
};

export class Config {
	public static Levels = 'levels';
	public static Appenders = 'appenders';
	public static Categories = 'categories';
	public static PM2 = 'pm2';
	public static PM2InstanceVar = 'pm2InstanceVar';
	public static DisableClustering = 'disableClustering';

	private static c: any;
	//使配置生效
	public static reset() {
		Config.c = {
			appenders: { console: { type: 'console', layout: { ...Layout.default } } },
			categories: { default: { appenders: ['console'], level: 'INFO' } },
		};
		Config.apply();
	}
	public static apply() {
		log4js.configure(Config.c);
	}

	//appenders.console.layout.pattern
	private static getTarget(keyPath: string) {
		let target = Config.c;
		let tmp = keyPath.split('.');
		for (let i = 0; i <= tmp.length - 2; i++) {
			let key = tmp[i];
			if (target[key]) {
				target = target[key];
			} else {
				target = undefined;
				break;
			}
		}
		return target ? { target, key: tmp[tmp.length - 1] } : undefined;
	}
	//配置Appender
	public static set(keyPath: string, c: any, mode: 'merge' | 'override' = 'merge', apply: boolean = true) {
		let t = Config.getTarget(keyPath);
		if (!t) return;
		//
		let { target, key } = t;
		if (!c) delete target[key];
		if (mode === 'merge') target[key] = ObjectUtils.extend(target[key], c);
		else target[key] = c;
		//
		if (apply) Config.apply();
	}

	//快捷方式
	public static setLayoutPattern(appenderKey: string = 'console', pattern: string = `%[[%d] [%z] [%p]%] - %m`, apply: boolean = true) {
		Config.set(`${Config.Appenders}.${appenderKey}.layout.pattern`, pattern, 'override', apply);
	}
	public static setCategoryLevel(categoryKey: string = 'default', level: string = `INFO`, apply: boolean = true) {
		Config.set(`${Config.Categories}.${categoryKey}.level`, level, 'override', apply);
	}
}
Config.reset();

//
export class Logger {
	public logger: log4js.Logger;
	public category: any;

	constructor(category?: any) {
		this.category = category;
		this.logger = log4js.getLogger(this.category);
		return this;
	}

	public setCategory(category: any) {
		this.category = category;
		this.logger = log4js.getLogger(this.category);
		return this;
	}

	//
	public trace(message: any, ...args) {
		this.logger.trace(message, ...args);
	}
	public debug(message: any, ...args) {
		this.logger.debug(message, ...args);
	}
	public info(message: any, ...args) {
		this.logger.info(message, ...args);
	}
	public warn(message: any, ...args) {
		this.logger.warn(message, ...args);
	}
	public error(message: any, ...args) {
		this.logger.error(message, ...args);
	}
	public fatal(message: any, ...args) {
		this.logger.fatal(message, ...args);
	}
	public mark(message: any, ...args) {
		this.logger.mark(message, ...args);
	}
}
