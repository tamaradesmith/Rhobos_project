
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('temperatures').del()
    .then(function () {
      // Inserts seed entries
      return knex('temperatures').insert([
        { temperature: 21, },
        { temperature: 20 },
        { temperature: 18 },
        { temperature: 21 },
        { temperature: 23 },
        { temperature: 22 },
        { temperature: 21 },
        { temperature: 19 },
        { temperature: 18 },
        { temperature: 21 },
        { temperature: 20 },
        { temperature: 18 }

      ]);
    });
};
