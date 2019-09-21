
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sensors').del()
    .then(function () {
      // Inserts seed entries
      return knex('sensors').insert([
        { type: "red", device_id: 1 },
        { type: "green", device_id: 1 },
        { type: "blue", device_id: 1 },
        { type: "clear", device_id: 1 },
        { type: "lux", device_id: 1 },
        { type: "cct", device_id: 1 },
      ]

);
    });
};
