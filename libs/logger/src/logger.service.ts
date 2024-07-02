import { Injectable } from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor(options?: LoggerOptions) {
    const fileConfig = {
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',
      json: true,
    };

    const errorTransports = [
      new transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        ...fileConfig,
        dirname: 'logs/error',
        level: 'error',
      }),
    ];

    this.logger = createLogger(
      options || {
        levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
        transports: [
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.printf(({ context, level, message }) => {
                const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                const appStr = chalk.green(`[NEST]`);
                const contextStr = chalk.yellow(`[${context}]`);

                return `${appStr} ${time} ${level} ${contextStr} ${message} `;
              }),
            ),
          }),
          ...errorTransports,
          new transports.DailyRotateFile({
            format: format.combine(format.timestamp(), format.json()),
            ...fileConfig,
            dirname: 'logs/info',
            level: 'info',
          }),
          new transports.DailyRotateFile({
            format: format.combine(format.timestamp(), format.json()),
            ...fileConfig,
            dirname: 'logs/warn',
            level: 'warn',
          }),
        ],
        exceptionHandlers: errorTransports,
        rejectionHandlers: errorTransports,
      },
    );
  }

  log(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, context?: string) {
    this.logger.log('error', message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.log('warn', message, { context });
  }
}
