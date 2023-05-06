import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1683330823013 implements MigrationInterface {
  name = 'Initialize1683330823013'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "sections" (
        "section_id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
        "title" character varying(30) NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "PK_c5641bfa4992d9bb24205e4cf12" PRIMARY KEY ("section_id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sections"`);
  }

}
