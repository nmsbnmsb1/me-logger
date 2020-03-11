const Logger = require('./../lib').default;

const funcNames = ['trace', 'debug', 'info', 'warn', 'error'];
const logger = new Logger(Logger.Console, { level: 'warn', layout: { type: 'pattern', pattern: `%[[%d] [%c] [%p]%] - %m` } }, 'Test');

for (const funcName of funcNames) {
  logger[funcName]('Hello World');
}
