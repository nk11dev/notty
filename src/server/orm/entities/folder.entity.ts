import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import BaseEntity from '@/server/orm/entities/base.entity';
import UserEntity from '@/server/orm/entities/user.entity';
import NoteEntity from '@/server/orm/entities/note.entity';

@Entity('folders')
export default class FolderEntity extends BaseEntity {
  @Column({
    nullable: false,
    length: 30,
    default: () => "'Untitled folder'",
  })
  title: string

  // For the purpose of fetching foreign key column, we should add 'user_id' column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'user_id',
    nullable: false,
  })
  user_id: string;

  @ManyToOne(
    () => UserEntity,
    (user) => user.folders,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk__folders__user_id'
  })
  user_info: UserEntity

  @OneToMany(
    () => NoteEntity,
    (note) => note.folder_info,
  )
  notes: NoteEntity[]
}