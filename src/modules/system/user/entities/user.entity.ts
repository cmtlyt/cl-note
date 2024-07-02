import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { Role } from '../../role/entities/role.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '账号', unique: true })
  account: string;

  @Column({ comment: '昵称' })
  nickname: string;

  @Column({ comment: '生日', nullable: true })
  birthday: Date;

  @Column({ comment: '性别', nullable: true })
  sex: string;

  @Column({ comment: '手机号', nullable: true })
  phone: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '头像', default: '' })
  avatar: string;

  @Column({ comment: '浏览器指纹', nullable: true })
  fingerprint: string;

  @Column({ comment: '当前组织id', default: 0 })
  curOrgId: number;

  @ManyToMany(() => Organization)
  @JoinTable({ name: 'user_organization_relation' })
  orgs: Organization[];

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'user_premission_relation' })
  prems: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role_relation' })
  roles: Role[];
}
