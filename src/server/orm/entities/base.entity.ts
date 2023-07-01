import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { dateTranformer } from '@/server/helpers/orm.helpers';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({
    type: 'timestamptz',
    nullable: false,
    transformer: dateTranformer,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    transformer: dateTranformer,
  })
  updated_at: Date;
}