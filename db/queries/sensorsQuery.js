
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
                    .where({ device_id: devicesData[0].id, name: params.sensor })
            }).then((sensorsData) => {
                knex("readings")
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
        const reading = await knex("readings")
            .select("value", "time", "sensor_id")
            .where({ sensor_id: sensor_id })
            .orderBy("time", "desc")
            .limit(1)
        return reading;
    },
    async allReadings(sensor_id) {
        const readings = await knex('readings')
            .select("*")
            .where({ sensor_id: sensor_id })
            .orderBy("time", "desc")
            .limit(24);
        return readings;
    },
    async  currentReading(name, device) {
        const url = `http://${device.IPaddress}/api/sensors/${device.name}/${name}`;
        const currentTemp = await axios.get(url);
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
    async getSensorFromId(sensor_id) {
        const sensorData = await knex("sensors")
            .select("*")
            .where({ id: sensor_id });
        return sensorData[0];
    },

    async getSensorsReading(sensorsArray) {
        let readings = await Promise.all(sensorsArray.map(async sensor => {
            const reading = await this.allReadings(sensor.id);
           await reading.map(async read =>{
                read.sensor = sensor.name
            })
            return reading;
        }));

        return await readings;

    }
}