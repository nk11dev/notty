import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1690036654710 implements MigrationInterface {
  name = 'Initial1690036654710'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "notes" (
        "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
        "title" character varying(30) NOT NULL DEFAULT 'Untitled note', 
        "body" text, 
        "is_bookmark" boolean NOT NULL DEFAULT false, 
        "user_id" integer NOT NULL,
        "folder_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE,  
        CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, 
        "email" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "username" character varying, 
        "last_login_at" TIMESTAMP WITH TIME ZONE, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "index__users__email" 
        ON "users" ("email") 
    `);
    await queryRunner.query(`
      CREATE TABLE "folders" (
        "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,  
        "title" character varying(30) NOT NULL DEFAULT 'Untitled folder', 
        "user_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "notes" 
        ADD CONSTRAINT "fk__notes__user_id" 
          FOREIGN KEY ("user_id") 
          REFERENCES "users"("id") 
          ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "notes" 
        ADD CONSTRAINT "fk__notes__folder_id" 
          FOREIGN KEY ("folder_id") 
          REFERENCES "folders"("id") 
          ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "folders" 
        ADD CONSTRAINT "fk__folders__user_id" 
          FOREIGN KEY ("user_id") 
          REFERENCES "users"("id") 
          ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "folders" 
        DROP CONSTRAINT "fk__folders__user_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "notes" 
        DROP CONSTRAINT "fk__notes__folder_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "notes" 
        DROP CONSTRAINT "fk__notes__user_id"
    `);
    await queryRunner.query(`DROP TABLE "folders"`);
    await queryRunner.query(`DROP INDEX "public"."index__users__email"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "notes"`);
  }

}
