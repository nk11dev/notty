import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { dateTranformer } from '@/server/helpers/db-orm.helpers';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS'
  })
  section_id: number;

  @Column({
    nullable: false,
    length: 30
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

  @BeforeInsert()
  setDefaultTitle() {
    if (!this.title) {
      this.title = 'Untitled section';
    }
  }
}