import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import FolderEntity from '@/server/api/entities/folder.entity';
import { dateTranformer } from '@/server/helpers/api.helpers';

@Entity('notes')
export default class NoteEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'pk_note_id'
  })
  id: number;

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

  // For the purpose of fetching foreign key column, we should add "folder_id" column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'folder_id',
    nullable: false,
  })
  folder_id: number;

  @ManyToOne(
    () => FolderEntity,
    (section) => section.notes,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: "folder_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_folder_id"
  })
  section: FolderEntity
}