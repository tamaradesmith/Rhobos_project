
exports.up = function (knex) {
  return knex.schema.createTable("controllers", t => {
    t.bigIncrements("id");
    t.string("name");
    t.string("type");
    t.integer('device_id');
    t.foreign('device_id').references('devices.id');
    t.timestamp;
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("controllers")
};
