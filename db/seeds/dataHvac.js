const knex = require('../../client')



// {
//   node: 'dsss',
//     device: 'mcp1',
//       sensor: 'temperature',
//         date: '2019/10/09 18:31:30',
//           value: '22.250'
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
//           { name: 'mcp1', node_id: data[0].id, IPaddress: '192.168.0.202' },
//         ]).then((data) => {
//             knex.destroy()
//             console.log("finished device")
//         });
//     })

// knex('devices')
//     .select('id')
//     .where({ name: "mcp1" })
//     .then((data) => {
//         devices_id = data[0].id
//         knex("sensors")
//             .insert([
//                 { type: "temperature", device_id: devices_id },
//             ]).returning('*').then((e) => {
//                 console.log(e)
//                 knex.destroy();
//             })
//     })


// knex('devices')
//     .select('id')
//     .where({ name: "mcp1" })
//     .then((data) => {
//         devices_id = data[0].id
//         knex("controllers")
//             .insert([
//               { type: "pump", device_id: devices_id },
//                 { type: "green", device_id: devices_id },

//             ]).returning('type').then((e) => {
//                 console.log(e)
//                 knex.destroy();
//             })
//     })

// knex('devices')
//     .where("id", 1)
//     .update({
//         IPaddress: "192.168.0.201"
//     }).then(data => {
//         console.log(data)
//         knex.destroy();
//     })