const { Config, Logger, Layout } = require('./../lib');

let logger1 = new Logger();
logger1.info('Hello World!!');

//修改配置
Config.setLayoutPattern('console', `%[[%d] [%z] [%p]%] - 111%m`);
logger1.info('Hello World!!');

Config.setLayoutPattern('console', Layout.default.pattern);
logger1.info('Hello World!!');
