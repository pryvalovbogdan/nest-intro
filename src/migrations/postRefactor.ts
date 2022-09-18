import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1515769694450 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isDeleted" TO "isActives"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "title"`); // reverts things made in "up" method
  }
}
