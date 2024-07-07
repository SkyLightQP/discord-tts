import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const LOG_DIRECTORY = 'logs';

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] ${info.message}`
    )
  ),
  transports: [
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIRECTORY,
      filename: `%DATE%.log`,
      maxFiles: 14,
      zippedArchive: true
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIRECTORY,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
});
