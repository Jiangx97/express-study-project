/**
 * winston.js
 * winston 及 express-winston 日志框架配置
 */

const winston = require('winston');
var expressWinston = require('express-winston');

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
})


const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
})

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or less to `error.log`
//     // - Write all logs with importance level of `info` or less to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }


module.exports = {
  logger,
  errorLogger
}