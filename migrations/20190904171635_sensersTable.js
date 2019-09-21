
exports.up = function(knex) {
    return knex.schema.createTable("sensors", t => {
        t.bigIncrements("id");
        t.string("type");
        t.integer('device_id');
        t.foreign('device_id').references('devices.id');
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("sensors")
};
