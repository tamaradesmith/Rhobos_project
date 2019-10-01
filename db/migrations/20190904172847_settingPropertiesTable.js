
exports.up = function (knex) {
    return knex.schema.createTable("properties_setting", t => {
        t.bigIncrements("id");
        t.string("field");
        t.integer("value")
        t.integer('property_id');
        t.foreign('property_id').references('properties.id');
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("properties_setting")
};