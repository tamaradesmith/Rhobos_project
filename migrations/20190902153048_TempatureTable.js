
exports.up = function(knex) {
    return knex.schema.createTable("temperatures", t =>{
      t.bigIncrements("id");
        t.float("temperature");
        t.datetime("time")
      t.timestamp("createdAt").defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("temperatures")
};
