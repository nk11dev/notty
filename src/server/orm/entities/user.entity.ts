import { Entity, Column, Index } from 'typeorm';

import BaseEntity from '@/server/orm/entities/base.entity';
import { dateTranformer } from '@/server/helpers/orm.helpers';

@Entity('users')
export default class UserEntity extends BaseEntity {
  @Index('index_user_email')
  @Column({
    unique: true,
    nullable: false,
  })
  email: string

  @Column({
    nullable: false,
  })
  password: string

  @Column({
    nullable: true,
  })
  username: string

  @Column({
    type: 'timestamptz',
    nullable: true,
    transformer: dateTranformer,
  })
  last_login_at: Date;
}