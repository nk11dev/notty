import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1686266840289 implements MigrationInterface {
    name = 'Initial1686266840289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "notes" (
            "note_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
            "title" character varying(30) NOT NULL DEFAULT 'Untitled note', 
            "body" text, 
            "is_favorite" boolean NOT NULL DEFAULT false, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE, 
            "section_id" integer NOT NULL, 
            CONSTRAINT "pk_note_id" PRIMARY KEY ("note_id")
          )
        `);
        await queryRunner.query(`
          CREATE TABLE "sections" (
            "section_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
            "title" character varying(30) NOT NULL DEFAULT 'Untitled section', 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "pk_section_id" PRIMARY KEY ("section_id")
          )
        `);
        await queryRunner.query(`
          ALTER TABLE "notes" 
            ADD CONSTRAINT "fk_section_id" 
              FOREIGN KEY ("section_id") 
              REFERENCES "sections"("section_id") 
              ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "notes" 
            DROP CONSTRAINT "fk_section_id"
        `);
        await queryRunner.query(`DROP TABLE "sections"`);
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
