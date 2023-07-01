import { Entity, Column, OneToMany } from 'typeorm';

import BaseEntity from '@/server/orm/entities/base.entity';
import NoteEntity from '@/server/orm/entities/note.entity';

@Entity('folders')
export default class FolderEntity extends BaseEntity {
  @Column({
    nullable: false,
    length: 30,
    default: () => "'Untitled folder'",
  })
  title: string

  @OneToMany(
    () => NoteEntity,
    (note) => note.folder_info,
  )
  notes: NoteEntity[]
}