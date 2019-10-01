
exports.seed = function (knex) {
  return knex('nodes').del()
    .then(function () {
      return knex('nodes').insert([
        { name: 'dsss' }
      ]);
    }).then(() => {
      knex('nodes')
        .select('id')
        .where({ name: "dsss" })
        .then((data) => {
          console.log(data[0].id)
          return knex('devices').insert([
            { name: 'colour', node_id: data[0].id },
          ]).then(() => {
            knex.destroy()
            console.log("finished device")
          });
        })
        .then(() => {
          return knex('devices')
            .select('id')
            .where({ name: "colour" })
            .then((data) => {
              devices_id = data[0].id
              knex("sensors")
                .insert([
                  { type: "red", device_id: devices_id },
                  { type: "green", device_id: devices_id },
                  { type: "blue", device_id: devices_id },
                  { type: "clear", device_id: devices_id },
                  { type: "lux", device_id: devices_id },
                  { type: "cct", device_id: devices_id },
                ]).returning('type').then((e) => {
                  console.log(e)
                  knex.destroy();
                })
            })
        })

    })
};
