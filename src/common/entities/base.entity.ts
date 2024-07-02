import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ comment: '创建时间', name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新时间', name: 'update_time' })
  updateTime: Date;

  @Column({ name: 'create_by', nullable: true })
  createBy: number;

  @Column({ name: 'update_by', nullable: true })
  updateBy: number;

  @DeleteDateColumn({ comment: '删除时间', name: 'deleted_time' })
  deletedTime: Date;

  @Column({
    comment: '删除原因',
    name: 'deleted_reason',
    nullable: true,
    type: 'text',
  })
  deletedReason: string;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: number;
}
