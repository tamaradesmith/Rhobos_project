
exports.up = function(knex) {
  return knex.schema.alterTable("temperatures", t =>{
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.dropColumn("time");
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable("temperatures", t => {
        table.dropColumn("createdAt");
        t.integer("time");
    })
};
