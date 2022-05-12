const { SCHEDULES } = require('../dist/enums/TableNames').TableNames;
const { readdir } = require('fs/promises');
const { join } = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const basePath = join(__dirname, '..', 'assets', 'schedules');

  const schedules = (await readdir(basePath)).map(file => {
    const [ sign ] = file.split('.');

    return {
      sign,
      path: join(basePath, file)
    }
  });

  await knex.table(SCHEDULES).del();
  await knex.table(SCHEDULES).insert(schedules);
};
