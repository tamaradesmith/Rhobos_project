
exports.up = function(knex) {
  return knex.schema.alterTable("reading", t =>{
      t.datetime("time")
      t.dropColumn("field")
      t.float("value").alter()
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable("reading", t => {
    t.dropColumn("time")
      t.string("field")
      t.integer("value").alter()
    
 
})
  
};
