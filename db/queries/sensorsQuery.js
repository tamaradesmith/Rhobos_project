
const knex = require('../../client');
const axios = require('axios');

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
    async lastReading(sensor_id) {
        const reading = await knex("reading")
            .select("value", "time")
            .where({ id: sensor_id });
            console.log(reading)
        return reading;

    },
    async allReadings(sensor_id) {
        const readings = await knex('reading')
            .select("*")
            .where({ sensor_id: sensor_id })
            .limit(24);
        return readings;

    },
    async  currentReading(name, ip) {
        const url = `${ip}/sensors/colour/${name}`
        const currentTemp = await axios.get(`${url}`)
        const value = await this.getValue(currentTemp.data);
        return value;
    },
    getValue(data) {
        const start = data.indexOf("<value>");
        const end = data.indexOf("</value>");
        return data.substring(start + 7, end);
    },
    async getSensorsByDevice(device_id) {
        const sensorData = await knex("sensors")
            .select("*")
            .where({ device_id: device_id });
        return sensorData;
    },
}