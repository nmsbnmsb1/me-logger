const { Config, Logger, Layout } = require('./../lib');

let logger1 = new Logger();
//console.log(Config.getC().appenders);
logger1.info('Hello World!!');

//修改配置
Config.setAppender('console', { layout: { pattern: `%[[%d] [%z] [%p]%] - 111%m` } });
//console.log(Config.getC().appenders);
logger1.info('Hello World!!');

Config.setAppender('console', { layout: { pattern: Layout.default.pattern } });
//console.log(Config.getC().appenders);
logger1.info('Hello World!!');
