
const knex = require('../client');

// save Readings to DB

module.exports = {

    saveSensorReading(params) {
        knex("nodes")
            .select("*")
            .where({ name: params.node })
            .then((nodeData) => {
                return knex("devices")
                    .select("*")
                    .where({ node_id: nodeData[0].id, name: params.device })
            }).then((devicesData) => {
                return knex("sensors")
                    .select("*")
                    .where({ device_id: devicesData[0].id, type: params.sensor })
            }).then((sensorsData) => {
                knex("reading")
                    .insert([
                        {
                            value: params.value,
                            time: params.date,
                            sensor_id: sensorsData[0].id
                        }
                    ])
                    .returning("*")
                    .then((readingData) => {
                        console.log('saved');
                        return readingData.sensor_id;
                    });
            });
    },

    lastReading(params) {
        const postParams = {
            node: params.body.node,
            device: params.body.device,
            sensor: params.body.sensor,
            date: params.body.date,
            value: params.body.value
        };
        knex("nodes")
            .select("*")
            .where({ name: postParams.node })
            .then((nodes) => {
                return knex("devices")
                    .select("*")
                    .where({ node_id: nodes[0].id, name: postParams.device })
            }).then((devices) => {
                return knex("sensors")
                    .select("*")
                    .where({ device_id: devices[0].id, type: postParams.sensor })
            }).then((sensors) => {
                knex("reading")
                    .insert([
                        {
                            value: postParams.value,
                            time: postParams.date,
                            sensor_id: sensors[0].id
                        }
                    ])
                    .returning("*")
                    .then((readings) => {
                        tempatureCheck(readings[0]);
                        res.send(' Tempature Reading reseved');
                    });
            });
    },
    currentReading(){
        
    }
}