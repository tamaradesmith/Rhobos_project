
exports.up = function(knex) {
    return knex.schema.createTable("temperatures", t =>{
      t.bigIncrements("id");
        t.integer("temperature");
        t.integer("time");

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("temperatures")
};
