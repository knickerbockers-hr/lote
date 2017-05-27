
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('senders_receivers', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('sender_id').references('profiles.id');
      table.integer('receiver_id').references('profiles.id');
      table.timestamps(true, true);
      table.index(['sender_id']);
    }),
    // should eventually refactor the locations schema to not have to lookup records using their address
    knex.schema.createTableIfNotExists('locations', function (table) {
      table.increments('id').unsigned().primary();
      table.json('address');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('profiles_locations', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id');
      table.integer('location_id').references('locations.id');
      table.string('location_name', 100).nullable();
      table.timestamps(true, true);
      table.index(['profile_id']);
    }),
    knex.schema.createTableIfNotExists('lotes_text', function (table) {
      table.increments('id').unsigned().primary();
      table.text('message');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('lotes_audio', function (table) {
      table.increments('id').unsigned().primary();
      table.text('path');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('lotes_sent', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('sender_id').references('profiles.id');
      table.string('lote_type', 20).nullable();
      table.integer('lote_id');
      table.integer('location_id').references('locations.id');
      table.integer('radius');
      table.string('lock', 10).nullable();
      table.timestamps(true, true);
      table.index(['sender_id']);
    }),
    knex.schema.createTableIfNotExists('lotes_received', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('lotes_sent_id').references('lotes_sent.id');
      table.integer('receiver_id').references('profiles.id');
      table.timestamp('opened_at');
      table.timestamp('resolved_at');
      table.string('status', 10).nullable();
      table.timestamps(true, true);
      table.index(['lotes_sent_id']);
      table.index(['receiver_id']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('lotes_received'),
    knex.schema.dropTable('lotes_sent'),
    knex.schema.dropTable('lotes_audio'),
    knex.schema.dropTable('lotes_text'),
    knex.schema.dropTable('profiles_locations'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('senders_receivers'),
  ]);
};
