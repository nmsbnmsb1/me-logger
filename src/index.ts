import log4js from 'log4js';
import { ObjectUtils } from 'me-utils';

export const Adapter = {
	Console: (config: any) => {
		let { level, layout } = config;
		level = level ? level.toUpperCase() : 'ALL';
		layout = layout || { ...Layout.default };

		return Object.assign(
			{
				appenders: {
					console: { type: 'console', layout },
				},
				categories: {
					default: { appenders: ['console'], level },
				},
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
				appenders: {
					file: { type: 'file', filename, maxLogSize, backups, absolute, layout },
				},
				categories: {
					default: { appenders: ['file'], level },
				},
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
				appenders: {
					dateFile: { type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout },
				},
				categories: {
					default: { appenders: ['dateFile'], level },
				},
			},
			config
		);
	},
	Gelf: (config: any) => {
		const { level, host, hostname, port, facility } = config;
		return Object.assign(
			{
				appenders: {
					gelf: { type: 'gelf', host, hostname, port, facility },
				},
				categories: {
					default: { appenders: ['gelf'], level },
				},
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

	private static c: any = {
		appenders: { console: { type: 'console', layout: { ...Layout.default } } },
		categories: { default: { appenders: ['console'], level: 'INFO' } },
	};

	//配置Appender
	public static setAppender(key: string, c: any, mode: 'merge' | 'override' = 'merge', apply: boolean = true) {
		if (!c) delete Config.c.appenders[key];
		else if (mode === 'merge') Config.c.appenders[key] = ObjectUtils.extend(Config.c.appenders[key], c);
		else Config.c.appenders[key] = c;
		//
		if (apply) Config.apply();
	}
	public static setCategorie(key: string, c: any, mode: 'merge' | 'override' = 'merge', apply: boolean = true) {
		if (!c) {
			if (key !== 'default') delete Config.c.categories[key];
		} else if (mode === 'merge') Config.c.categories[key] = ObjectUtils.extend(Config.c.categories[key], c);
		else Config.c.categories[key] = c;
		//
		if (apply) Config.apply();
	}
	public static set(key: string, c: any, mode: 'merge' | 'override' = 'merge', apply: boolean = true) {
		if (mode === 'merge') Config.c[key] = ObjectUtils.extend(Config.c[key], c);
		else Config.c[key] = c;
		//
		if (apply) Config.apply();
	}

	//快捷方式
	// public static setLayout(
	// 	key: string = 'console',
	// 	layout: {
	// 		type: 'basic' | 'coloured' | 'messagePassThrough' | 'dummy' | 'pattern' | string;
	// 		pattern?: string;
	// 		tokens?: { [token: string]: (logEvent: any) => string };
	// 	},
	// 	apply: boolean = true
	// ) {
	// 	if (Config.c.appenders[key]) {
	// 		Config.c.appenders[key].layout = layout;
	// 		//
	// 		if (apply) Config.apply();
	// 	}
	// }
	public static setLayoutPattern(key: string = 'console', pattern: string = `%[[%d] [%z] [%p]%] - %m`, apply: boolean = true) {
		if (Config.c.appenders[key] && Config.c.appenders[key].layout) {
			Config.c.appenders[key].layout.pattern = pattern;
			//
			if (apply) Config.apply();
		}
	}
	public static setCategoryLevel(key: string = 'default', level: string = `INFO`, apply: boolean = true) {
		if (Config.c.categories[key]) {
			Config.c.categories[key].level = level;
			//
			if (apply) Config.apply();
		}
	}

	//使配置生效
	public static getC() {
		return Config.c;
	}
	public static apply() {
		log4js.configure(Config.c);
	}
	//重置配置
	public static reset() {
		Config.c = {
			appenders: { console: { type: 'console', layout: { ...Layout.default } } },
			categories: { default: { appenders: ['console'], level: 'INFO' } },
		};
		log4js.configure(Config.c);
	}
}
Config.apply();

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
