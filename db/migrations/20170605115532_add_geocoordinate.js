
exports.up = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.double('latitude');
    table.double('longitude');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('locations', (table) => {
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  });
};
