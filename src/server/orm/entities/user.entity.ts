import { Entity, Column, Index, OneToMany } from 'typeorm';

import { UserRole } from '@/common/constants';

import BaseEntity from '@/server/orm/entities/base.entity';
import FolderEntity from '@/server/orm/entities/folder.entity';
import NoteEntity from '@/server/orm/entities/note.entity';
import { entityDateTranformer } from '@/server/helpers/orm.helpers';

@Entity('users')
export default class UserEntity extends BaseEntity {
  @Index('index__users__email')
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
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'timestamptz',
    nullable: true,
    transformer: entityDateTranformer,
  })
  last_login_at: Date;

  @OneToMany(
    () => FolderEntity,
    (folder) => folder.user_info,
  )
  folders: FolderEntity[]

  @OneToMany(
    () => NoteEntity,
    (note) => note.user_info,
  )
  notes: NoteEntity[]
}