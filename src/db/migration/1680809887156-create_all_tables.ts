import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1680809887156 implements MigrationInterface {
    name = 'CreateAllTables1680809887156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_a624876e942ef326e906992387" ON "todos" ("completed") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`DROP INDEX "IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`DROP INDEX "IDX_a624876e942ef326e906992387"`);
        await queryRunner.query(`CREATE TABLE "temporary_todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todos"("id", "title", "completed", "createdAt", "updatedAt", "userId") SELECT "id", "title", "completed", "createdAt", "updatedAt", "userId" FROM "todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`ALTER TABLE "temporary_todos" RENAME TO "todos"`);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_a624876e942ef326e906992387" ON "todos" ("completed") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a624876e942ef326e906992387"`);
        await queryRunner.query(`DROP INDEX "IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`ALTER TABLE "todos" RENAME TO "temporary_todos"`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "todos"("id", "title", "completed", "createdAt", "updatedAt", "userId") SELECT "id", "title", "completed", "createdAt", "updatedAt", "userId" FROM "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "temporary_todos"`);
        await queryRunner.query(`CREATE INDEX "IDX_a624876e942ef326e906992387" ON "todos" ("completed") `);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_a624876e942ef326e906992387"`);
        await queryRunner.query(`DROP INDEX "IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
