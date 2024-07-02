import { BaseEntity } from '@common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Organization } from '../../organization/entities/organization.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'description',
    comment: '权限描述',
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Permission, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'role_permission_relation' })
  perms: Permission[];

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'org_id' })
  orgInfo: Organization;
}
