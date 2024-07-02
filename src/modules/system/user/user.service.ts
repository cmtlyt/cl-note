import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Organization } from '../organization/entities/organization.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async init() {
    const org1 = new Organization();
    org1.name = 'org1';
    org1.description = 'org1';

    const prem1 = new Permission();
    prem1.name = 'prem1';
    prem1.description = 'prem1';
    prem1.code = 'prem1';

    const prem2 = new Permission();
    prem2.name = 'prem2';
    prem2.description = 'prem2';
    prem2.code = 'prem2';

    const role1 = new Role();
    role1.name = 'role1';
    role1.description = 'role1';

    role1.perms = [prem1, prem2];

    const user1 = new User();
    user1.account = 'user1';
    user1.nickname = 'user1';
    user1.password = '123';
    user1.curOrgId = org1.id;

    user1.prems = [prem1];
    user1.roles = [role1];

    org1.users = [user1];
    org1.roles = [role1];

    await this.entityManager.save([org1, user1, prem1, role1, prem2]);
  }
}
