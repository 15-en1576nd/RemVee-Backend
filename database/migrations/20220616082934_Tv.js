/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Tv', function (table) {
        table.increments();
        table.string('name');
        // table.unsignedBigInteger('team_id');
        table.string('ipaddress');
        table.timestamps();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Tv');
};
