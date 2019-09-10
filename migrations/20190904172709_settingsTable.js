
exports.up = function (knex) {
    return knex.schema.createTable("controller_setttings", t => {
        t.bigIncrements("id");
        t.string("field");
        t.integer("value")
        t.integer('controller_id');
        t.foreign('controller_id').references('controllers.id');
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("setttings")
};
