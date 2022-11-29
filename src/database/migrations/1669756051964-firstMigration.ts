import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class firstMigration1669756051964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "serial",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(60)",
          },
          {
            name: "email",
            type: "varchar(60)",
          },
          {
            name: "pass",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
