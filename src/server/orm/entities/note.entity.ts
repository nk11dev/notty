import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BaseEntity from '@/server/orm/entities/base.entity';
import UserEntity from '@/server/orm/entities/user.entity';
import FolderEntity from '@/server/orm/entities/folder.entity';

@Entity('notes')
export default class NoteEntity extends BaseEntity {
  @Column({
    nullable: false,
    length: 30,
    default: 'Untitled note',
  })
  title: string

  @Column({
    type: 'text',
    nullable: true,
  })
  body: string

  @Column({
    nullable: false,
    default: false,
  })
  is_bookmark: boolean

  // For the purpose of fetching foreign key column, we should add 'user_id' column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'user_id',
    nullable: false,
  })
  user_id: string;

  @ManyToOne(
    () => UserEntity,
    (user) => user.notes,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk__notes__user_id'
  })
  user_info: UserEntity


  // For the purpose of fetching foreign key column, we should add 'folder_id' column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'folder_id',
    nullable: false,
  })
  folder_id: string;

  @ManyToOne(
    () => FolderEntity,
    (folder) => folder.notes,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'folder_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk__notes__folder_id'
  })
  folder_info: FolderEntity
}