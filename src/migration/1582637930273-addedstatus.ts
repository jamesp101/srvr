import {MigrationInterface, QueryRunner} from "typeorm";

export class addedstatus1582637930273 implements MigrationInterface {
    name = 'addedstatus1582637930273'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceID" varchar NOT NULL, "alias" varchar NOT NULL, "userId" integer, "status" varchar NOT NULL, CONSTRAINT "UQ_e057d14e325f4bf6a045bc39e28" UNIQUE ("deviceID"), CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_device"("id", "deviceID", "alias", "userId") SELECT "id", "deviceID", "alias", "userId" FROM "device"`, undefined);
        await queryRunner.query(`DROP TABLE "device"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_device" RENAME TO "device"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "device" RENAME TO "temporary_device"`, undefined);
        await queryRunner.query(`CREATE TABLE "device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceID" varchar NOT NULL, "alias" varchar NOT NULL, "userId" integer, CONSTRAINT "UQ_e057d14e325f4bf6a045bc39e28" UNIQUE ("deviceID"), CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "device"("id", "deviceID", "alias", "userId") SELECT "id", "deviceID", "alias", "userId" FROM "temporary_device"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_device"`, undefined);
    }

}
