
exports.up = function (knex) {
  return knex.schema.createTable("nodes", t => {
    t.bigIncrements("id");
    t.string("name");
    t.text("description");
    t.string("type");
    t.string("IPaddress");
    t.timestamp
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("nodes")
};
