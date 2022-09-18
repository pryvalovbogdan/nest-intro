import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdmin1515769694451 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user"(email, "firstName", "lastName", "accountType") VALUES ('admin@gmail.com', 'admin', 'admin', 'admin');`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "title"`); // reverts things made in "up" method
  }
}
