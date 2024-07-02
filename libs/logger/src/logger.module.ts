import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

export const LOGGER_TOKEN = 'CL:LOG_CONFIG';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options?: any): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_TOKEN,
          useValue: new LoggerService(options),
        },
      ],
      exports: [LOGGER_TOKEN],
    };
  }
}
