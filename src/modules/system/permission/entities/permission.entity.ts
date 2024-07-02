import { BaseEntity } from '@common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', comment: '权限名称' })
  name: string;

  @Column({ name: 'code', comment: '权限code', unique: true })
  code: string;

  @Column({
    name: 'description',
    comment: '权限描述',
    type: 'text',
    nullable: true,
  })
  description: string;
}
