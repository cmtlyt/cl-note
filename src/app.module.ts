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

@Module({
  imports: [
    LoggerModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '00000000',
      database: 'cl_note',
      entities: [Organization, User, Permission, Role],
      synchronize: true,
      logging: true,
      poolSize: 5,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    OrganizationModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
