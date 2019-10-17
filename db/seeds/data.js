const knex = require('../../client')


// {
//     node: 'dsss',
//         device: 'colour',
//             sensor: 'red',
//                 date: '2019/09/18 19:01:30',
//                     value: '3255.000'
// }
// knex("nodes")
//   .insert({ name: "dsss", description: "Over Blown Home environment moniteering and contral system node" })
//   .then(() => {
//     knex.destroy()
//     console.log("finished Nodes")
//   });



// knex('nodes')
//     .select('id')
//     .where({ name: "dsss" })
//     .then((nodeData) => {
//         console.log(nodeData[0].id)
//         return knex('devices').insert([
//             { name: 'colour', node_id: nodeData[0].id, IPaddress: "192.168.0.201", description: "decorative garden device for lights and water feature", type: "huzzah" },
//         ]).then(() => {
//             knex.destroy()
//             console.log("finished device")
//         });
//     })

// knex('devices')
//     .select('id')
//     .where({ name: "colour" })
//     .then((data) => {
//         devices_id = data[0].id
//         knex("sensors")
//             .insert([
//                 { name: "red", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id },
//                 { name: "green", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id },
//                 { name: "blue", type: "range",  minValue: "0.000", maxValue: "1023.000", device_id: devices_id },
//                 { name: "clear", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id },
//                 { name: "lux", type: "range", minValue: "0.000", maxValue: "1023.000", device_id: devices_id },
//                 { name: "cct", type: "range", minValue: "0.000", maxValue: "100000.000", device_id:  devices_id },
//             ]).then((data) => {
//                 console.log(data)
//                 knex.destroy();
//             })
//     })


// knex('devices')
//   .select('id')
//   .where({ name: "colour" })
//   .then((data) => {
//     devices_id = data[0].id
//     knex("controllers")
//       .insert([
//         { name: "pump", type: "boolean", device_id: devices_id },
//         { name: "red", type: "boolean", device_id: devices_id },
//         { name: "blue", type: "boolean", device_id: devices_id },
//         { name: "led", type: "boolean", device_id: devices_id },
//       ]).returning('type').then((e) => {
//         console.log(e)
//         knex.destroy();
//       })
//   })


