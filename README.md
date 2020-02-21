# me-logger

### Example

```js
const Logger = require('./../lib').default;

const funcNames = ['trace', 'debug', 'info', 'warn', 'error'];
const logger = new Logger(Logger.Console, { title: 'Test' });

for (const funcName of funcNames) {
  logger[funcName]('Hello World');
}
```
