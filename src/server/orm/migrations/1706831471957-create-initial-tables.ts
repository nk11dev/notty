import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1706831471957 implements MigrationInterface {
  name = 'CreateInitialTables1706831471957'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "notes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE,
        "title" character varying(30) NOT NULL DEFAULT 'Untitled note', 
        "body" text, 
        "is_bookmark" boolean NOT NULL DEFAULT false, 
        "user_id" uuid NOT NULL, 
        "folder_id" uuid NOT NULL, 
        CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id")
      )`);
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')
    `);
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        "email" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "username" character varying, 
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', 
        "last_login_at" TIMESTAMP WITH TIME ZONE, 
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "index__users__email" ON "users" ("email")
    `);
    await queryRunner.query(`
      CREATE TABLE "folders" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE, 
        "title" character varying(30) NOT NULL DEFAULT 'Untitled folder', 
        "user_id" uuid NOT NULL, 
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
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "notes"`);
  }

}
