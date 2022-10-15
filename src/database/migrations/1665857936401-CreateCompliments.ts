import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompliments1665857936401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compliments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'user_sender',
            type: 'uuid',
          },
          {
            name: 'user_receiver',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserSenderCompliments',
            columnNames: ['user_sender'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            name: 'FKUserReceiverCompliments',
            columnNames: ['user_receiver'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            name: 'FKTagId',
            columnNames: ['tag_id'],
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }
}
