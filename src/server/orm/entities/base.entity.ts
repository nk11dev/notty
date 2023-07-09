import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { entityDateTranformer } from '@/server/helpers/orm.helpers';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({
    type: 'timestamptz',
    nullable: false,
    transformer: entityDateTranformer,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    transformer: entityDateTranformer,
  })
  updated_at: Date;
}