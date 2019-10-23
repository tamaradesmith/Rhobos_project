
exports.up = function(knex) {
  return knex.schema.createTable("lightshows", t => {
    t.bigIncrements("id");
    t.string("name");
    t.boolean("default")
    t.integer('controller_id');
    t.foreign('controller_id').references('controllers.id');
    t.timestamp;
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("lightshows")
  
};
