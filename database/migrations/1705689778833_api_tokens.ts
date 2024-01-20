import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateApiTokens extends BaseSchema {
  protected tableName = "api_tokens";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("name");
      table.string("token", 64).unique();
      table.string("type");
      table.dateTime("expires_at");
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
