
exports.up = function (knex) {
  return knex.schema.createTable("readings", t => {
    t.bigIncrements("id");
    t.float("value");
    t.datetime("time");
    t.integer('sensor_id');
    t.foreign('sensor_id').references('sensors.id');
    t.timestamp;
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("readings")
};
