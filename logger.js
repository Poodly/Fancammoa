const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
        new transports.File({ filename: 'error.log', level: 'error'}),
    ],
});

console.error = function(msg) {
    logger.error(msg);
  };

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
