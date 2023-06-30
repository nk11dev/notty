import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BaseModel from '@/server/api/models/base.model';
import FolderEntity from '@/server/api/entities/folder.entity';

@Entity('notes')
export default class NoteEntity extends BaseModel {
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

  // For the purpose of fetching foreign key column, we should add 'folder_id' column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'folder_id',
    nullable: false,
  })
  folder_id: number;

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
    foreignKeyConstraintName: 'fk_folder_id'
  })
  folder_info: FolderEntity
}