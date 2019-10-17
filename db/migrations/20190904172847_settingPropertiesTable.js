
exports.up = function (knex) {
    return knex.schema.createTable("properties_setting", t => {
        t.bigIncrements("id");
        t.string("field");
        t.float("value")
        t.integer('property_id');
        t.foreign('property_id').references('properties.id');
        t.timestamp;
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("properties_setting")
};