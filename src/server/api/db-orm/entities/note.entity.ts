import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import SectionEntity from '@/server/api/db-orm/entities/section.entity';
import { dateTranformer } from '@/server/helpers/db-orm.helpers';

@Entity('notes')
export default class NoteEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'pk_note_id'
  })
  note_id: number;

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
  is_favorite: boolean

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

  // For the purpose of fetching foreign key column, we should add "section_id" column explicitly and pass this column name to @JoinColumn decorator
  @Column({
    name: 'section_id',
    nullable: false,
  })
  section_id: number;

  @ManyToOne(
    () => SectionEntity,
    (section) => section.notes,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: "section_id",
    referencedColumnName: "section_id",
    foreignKeyConstraintName: "fk_section_id"
  })
  section: SectionEntity
}