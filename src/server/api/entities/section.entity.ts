import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import NoteEntity from '@/server/api/entities/note.entity';
import { dateTranformer } from '@/server/helpers/api.helpers';

@Entity('sections')
export default class SectionEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'pk_section_id'
  })
  section_id: number;

  @Column({
    nullable: false,
    length: 30,
    default: () => "'Untitled section'",
  })
  title: string

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

  @OneToMany(
    () => NoteEntity,
    (note) => note.section,
  )
  notes: NoteEntity[]
}