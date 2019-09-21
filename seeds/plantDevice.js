
exports.seed = function (knex) {

  return knex('devices').del()
    .then(
      knex('nodes')
        .select('id')
        .where({ name: "plant" })
        .then((data) => {
          console.log(data[0].id)
          return knex('devices').insert([
            { name: 'tcs34725', node_id: data[0].id },
          ]).then(() => {
            console.log("finished")

          });
        }))
}
