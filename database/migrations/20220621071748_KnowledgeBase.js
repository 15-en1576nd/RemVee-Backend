/**
 * @param { import("knex").Knex } knex
 * @param id primary key of the table
 * @param title string
 * @param description longtext
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('KnowledgeBaseTopics', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.longText('description');
    
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('KnowledgeBaseTopics');
};
