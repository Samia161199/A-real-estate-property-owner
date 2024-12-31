import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLProperty1734915641948 implements MigrationInterface {
    name = 'AddTBLProperty1734915641948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" SERIAL NOT NULL, "discription" character varying NOT NULL, "address" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_506f50c1c1e6510f038acd6414c" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_506f50c1c1e6510f038acd6414c"`);
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
