
exports.up = function(knex) {
  return knex.schema.alterTable('devices', t =>{
      t.string("IPaddress")
  })
};

exports.down = function(knex) {
  return knex.schema.alberTable('devices', t=>{
      t.dropColumn("IPaddress")
  })
};
