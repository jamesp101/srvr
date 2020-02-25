import {MigrationInterface, QueryRunner} from "typeorm";

export class new1582625874819 implements MigrationInterface {
    name = 'new1582625874819'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "timeline" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceID" varchar NOT NULL, "alias" varchar NOT NULL, CONSTRAINT "UQ_e057d14e325f4bf6a045bc39e28" UNIQUE ("deviceID"))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "devicesId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "firstname", "lastname", "email") SELECT "id", "username", "password", "firstname", "lastname", "email" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "devicesId" integer, CONSTRAINT "UQ_3021ae0235cf9c4a6d59663f859" UNIQUE ("username"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "firstname", "lastname", "email", "devicesId") SELECT "id", "username", "password", "firstname", "lastname", "email", "devicesId" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "devicesId" integer, CONSTRAINT "UQ_3021ae0235cf9c4a6d59663f859" UNIQUE ("username"), CONSTRAINT "FK_892974ddd433b8caa9de0a0bcef" FOREIGN KEY ("devicesId") REFERENCES "device" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "firstname", "lastname", "email", "devicesId") SELECT "id", "username", "password", "firstname", "lastname", "email", "devicesId" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "devicesId" integer, CONSTRAINT "UQ_3021ae0235cf9c4a6d59663f859" UNIQUE ("username"))`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "firstname", "lastname", "email", "devicesId") SELECT "id", "username", "password", "firstname", "lastname", "email", "devicesId" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "devicesId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "firstname", "lastname", "email", "devicesId") SELECT "id", "username", "password", "firstname", "lastname", "email", "devicesId" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "firstname", "lastname", "email") SELECT "id", "username", "password", "firstname", "lastname", "email" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "device"`, undefined);
        await queryRunner.query(`DROP TABLE "timeline"`, undefined);
    }

}
