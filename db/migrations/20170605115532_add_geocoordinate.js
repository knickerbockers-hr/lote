
exports.up = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.float('latitude');
    table.float('longitude');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  });
};
