
exports.up = function (knex) {
    return knex.schema.createTable("controller_settings", t => {
        t.bigIncrements("id");
        t.string("field");
        t.float("value")
        t.integer('controller_id');
        t.foreign('controller_id').references('controllers.id');
        t.timestamp;
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("controller_settings")
};
