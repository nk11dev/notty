import { Entity, Column, OneToMany } from 'typeorm';

import BaseModel from '@/server/api/models/base.model';
import NoteEntity from '@/server/api/entities/note.entity';

@Entity('folders')
export default class FolderEntity extends BaseModel {
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