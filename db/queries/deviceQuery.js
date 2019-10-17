const knex = require('../../client');
// const axios = require('axios');


module.exports = {
    async getOneDevice(id) {
        const deviceData = await knex('devices')
            .select("*")
            .where({ id: id });
        return deviceData;
    },
    async getAllDevices() {
        const devicesData = await knex('devices')
            .select("*");
        return devicesData;
    },
    async getDeviceIp(id) {
        const devicesIP = await knex('devices')
            .select('IPaddress')
            .where({ id: id });
        return `http://${devicesIP[0].IPaddress}/api`;
    },
}


