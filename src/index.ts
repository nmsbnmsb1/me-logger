// [think-logger]https://github.com/thinkjs/think-logger
// MIT License

// Copyright (c) 2016 ThinkJS

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import log4js from 'log4js';
import ConsoleAdapter from './console';
import FileAdapter from './file';
import DateFileAdapter from './datefile';
import GelfAdapter from './gelf';

export default class Logger {
	public static Console = ConsoleAdapter;
	public static File = FileAdapter;
	public static DateFile = DateFileAdapter;
	public static Gelf = GelfAdapter;

	private adapter: any;
	private config: any;
	private logger: log4js.Logger;

	constructor(adapter?: any, config: any = {}, category?: any) {
		this.adapter = adapter || ConsoleAdapter;
		this.setLogger(config, category);
	}

	// public formatConfig(config) {
	//   this.config = this.adapter(config);
	//   return this.config;
	// }

	// public configure(config: any) {
	//   return log4js.configure(config);
	// }

	public setLogger(config: any, category?: any) {
		this.config = this.adapter(config);
		log4js.configure(this.config);
		this.logger = log4js.getLogger(category);
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
