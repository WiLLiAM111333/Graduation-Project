const { SCHEDULES } = require('../dist/enums/TableNames').TableNames;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(SCHEDULES, table => {
    table.string('sign', 3).notNullable();
    table.string('full_name', 50).nullable();
    table.string('path').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(SCHEDULES);
};
