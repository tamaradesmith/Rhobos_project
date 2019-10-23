const knex = require('../../client')


// {
//     node: 'garden',
//         device: 'colour',
//             sensor: 'red',
//                 date: '2019/09/18 19:01:30',
//                     value: '3255.000'
// }

// knex("nodes")
//   .insert({ name: "garden", IPaddress: "192.168.0.201", description: "Decorative garden node with light and water features", type: "huzzah" })
//   .then(() => {
//     knex.destroy()
//     console.log("finished Nodes")
//   });



// knex('nodes')
//     .select('id')
//     .where({ name: "garden" })
//     .then((nodeData) => {
//         console.log(nodeData[0].id)
//         return knex('devices').insert([
//           { name: 'colour', node_id: nodeData[0].id, description: "light and colour sensor", type: "tcs34725 rgb sensor" }, { name: 'processor', node_id: nodeData[0].id, description: "controller for pump and led", type: "unknown" }
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
//                 console.log(data.name)
//                 knex.destroy();
//             })
//     })


// knex('devices')
//   .select('id')
//   .where({ name: "processor" })
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


// knex('nodes')
//     .select('id')
//     .where({ name: "garden" })
//     .then((nodeData) => {
//         console.log(nodeData[0].id)
//         return knex('devices').insert([
//           { name: 'colourapp', node_id: nodeData[0].id, description: "Decorative lighting feature", type: "led" }, 
//         ]).then(() => {
//             knex.destroy()
//             console.log("finished device")
//         });
//     })

// knex('devices')
//   .select('id')
//   .where({ name: "colourapp" })
//   .then((data) => {
//     devices_id = data[0].id
//     knex("controllers")
//       .insert([
//         { name: "show", type: "led", device_id: devices_id },
//       ]).returning('type').then((e) => {
//         console.log(e)
//         knex.destroy();
//       })
//   }) 

knex('controllers')
  .select('id')
  .where({ name: "show" })
  .then((data) => {
    controller_id = data[0].id
    knex("lightshows")
      .insert([
        { name: "test", default: "true",controller_id: controller_id },
        { name: "red", default: "false", controller_id: controller_id },
        { name: "blue", default: "false", controller_id: controller_id },
        { name: "green", default: "false", controller_id: controller_id },
      ]).returning('name').then((e) => {
        console.log(e)
        knex.destroy();
      })
  })