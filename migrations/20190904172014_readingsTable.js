
exports.up = function(knex) {
    return knex.schema.createTable("reading", t => {
        t.bigIncrements("id");
        t.string("field");
        t.integer("value")
        t.integer('sensor_id');
        t.foreign('sensor_id').references('sensors.id');
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reading")
};
