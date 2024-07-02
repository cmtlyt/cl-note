import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@mod/system/user/user.module';
import { Organization } from '@mod/system/organization/entities/organization.entity';
import { User } from '@mod/system/user/entities/user.entity';
import { Permission } from '@mod/system/permission/entities/permission.entity';
import { Role } from '@mod/system/role/entities/role.entity';
import { OrganizationModule } from './modules/system/organization/organization.module';
import { PermissionModule } from './modules/system/permission/permission.module';
import { RoleModule } from './modules/system/role/role.module';
import { LoggerModule } from '@lib/logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@common/config';
import { createClient } from 'redis';

export const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config()],
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        const dbConfig = configService.get('db.mysql');

        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [Organization, User, Permission, Role],
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
          poolSize: dbConfig.poolSize,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    OrganizationModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: REDIS_CLIENT_TOKEN,
      async useFactory(configService: ConfigService) {
        const dbConfig = configService.get('db.redis');

        const client = createClient({
          socket: {
            host: dbConfig.host,
            port: dbConfig.port,
          },
        });
        await client.connect();

        return client;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
