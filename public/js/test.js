const knex = require('../../client');

knex("nodes")
.select("*")
.where({name: "plant"})
.then((data) => {
    console.log(data)
  return  knex("devices")
    .select("*")
    .where({node_id: data[0].id})
}).then((data) =>{
    console.log(data)
   return knex("sensors")
    .select("*")
    .where({device_id: data[0].id})
    .returning("*")
}).then((data) =>{
    console.log( data)
    knex.destroy()
})
