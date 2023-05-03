import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { dateTranformer } from '@/server/helpers/db-orm.helpers';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS'
  })
  section_id: number;

  @Column({
    nullable: true,
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BeforeInsert()
  checkTitle() {
    if (!this.title) {
      this.title = 'orm (untitled section)';
      this.updated_at = null;
    }
  }
}