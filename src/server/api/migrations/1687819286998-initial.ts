import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1687819286998 implements MigrationInterface {
  name = 'Initial1687819286998'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "notes" (
        "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
        "title" character varying(30) NOT NULL DEFAULT 'Untitled note', 
        "body" text, 
        "is_bookmark" boolean NOT NULL DEFAULT false, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        "folder_id" integer NOT NULL, 
        CONSTRAINT "pk_note_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "sections" (
        "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
        "title" character varying(30) NOT NULL DEFAULT 'Untitled section', 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "pk_folder_id" PRIMARY KEY ("id")
      )
  `);
    await queryRunner.query(`
      ALTER TABLE "notes" 
        ADD CONSTRAINT "fk_folder_id" 
          FOREIGN KEY ("folder_id") 
          REFERENCES "sections"("id") 
          ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "notes" 
        DROP CONSTRAINT "fk_folder_id"
    `);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "notes"`);
  }

}
