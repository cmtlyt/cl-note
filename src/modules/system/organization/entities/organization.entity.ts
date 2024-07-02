import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

@Entity({ name: 'organization' })
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '组织名称' })
  name: string;

  @Column({
    name: 'description',
    comment: '权限描述',
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToMany(() => User, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'user_organization_relation' })
  users: User[];

  @ManyToMany(() => Role, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'role_organization_relation' })
  roles: Role[];
}
