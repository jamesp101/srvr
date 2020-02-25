import {MigrationInterface, QueryRunner} from "typeorm";

export class User1582621882704 implements MigrationInterface {
    name = 'User1582621882704'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
