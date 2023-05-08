import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Section } from '@/server/api/db-orm/entities/section.entity';
import { dateTranformer } from '@/server/helpers/db-orm.helpers';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
    primaryKeyConstraintName: 'pk_note_id'
  })
  note_id: number;

  @Column({
    nullable: false,
    length: 30,
    default: () => "'Untitled note'",
  })
  title: string

  @Column({
    type: 'text',
    nullable: true,
  })
  body: string

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

  @ManyToOne(
    () => Section,
    (section) => section.notes,
    { nullable: false }
  )
  @JoinColumn({
    name: "section_id",
    referencedColumnName: "section_id",
    foreignKeyConstraintName: "fk_section_id"
  })
  section_id: Section
}