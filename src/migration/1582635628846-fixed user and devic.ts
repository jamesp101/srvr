import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedUserAndDevic1582635628846 implements MigrationInterface {
    name = 'fixedUserAndDevic1582635628846'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_timeline" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "date" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_timeline"("id", "name", "type", "date") SELECT "id", "name", "type", "date" FROM "timeline"`, undefined);
        await queryRunner.query(`DROP TABLE "timeline"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_timeline" RENAME TO "timeline"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_timeline" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "date" datetime NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_timeline"("id", "name", "type", "date") SELECT "id", "name", "type", "date" FROM "timeline"`, undefined);
        await queryRunner.query(`DROP TABLE "timeline"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_timeline" RENAME TO "timeline"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "timeline" RENAME TO "temporary_timeline"`, undefined);
        await queryRunner.query(`CREATE TABLE "timeline" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "date" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "timeline"("id", "name", "type", "date") SELECT "id", "name", "type", "date" FROM "temporary_timeline"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_timeline"`, undefined);
        await queryRunner.query(`ALTER TABLE "timeline" RENAME TO "temporary_timeline"`, undefined);
        await queryRunner.query(`CREATE TABLE "timeline" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "date" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "timeline"("id", "name", "type", "date") SELECT "id", "name", "type", "date" FROM "temporary_timeline"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_timeline"`, undefined);
    }

}
