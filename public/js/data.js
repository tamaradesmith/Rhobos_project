const knex = require('../../client')


// {
//     node: 'dsss',
//         device: 'colour',
//             sensor: 'red',
//                 date: '2019/09/18 19:01:30',
//                     value: '3255.000'
// }
// knex("nodes")
//     .insert({name: "dsss"})
//     .then(() => {
//         knex.destroy()
//         console.log("finished Nodes")
//     });



// knex('nodes')
//     .select('id')
//     .where({ name: "dsss" })
//     .then((data) => {
//         console.log(data[0].id)
//         return knex('devices').insert([
//             { name: 'colour', node_id: data[0].id },
//         ]).then(() => {
//             knex.destroy()
//             console.log("finished device")
//         });
//     })

knex('devices')
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
                { type: "cct", device_id:  devices_id },
            ]).returning('type').then((e) => {
                console.log(e)
                knex.destroy();
            })
    })
