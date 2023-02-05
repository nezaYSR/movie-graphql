import { MigrationInterface, QueryRunner } from "typeorm";

export class test1675437397090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE movie ADD COLUMN authorId INTEGER`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
