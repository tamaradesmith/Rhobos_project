
exports.up = function (knex) {
  return knex.schema.createTable("devices", t => {
    t.bigIncrements("id");
    t.string("name");
    t.text("description");
    t.string("IPaddress");
    t.string("type");
    t.integer('node_id');
    t.foreign('node_id').references('nodes.id');
    t.timestamp;
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("devices")
};
