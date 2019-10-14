const knex = require('../../client');
const axios = require('axios');


module.exports = {
    async getOne(id) {
        const deviceData = await knex('devices')
            .select("*")
            .where({ id: id });
        return deviceData;
    },
    async getAll() {
        const devicesData = await knex('devices')
            .select("*");
        return devicesData;
    },
    async getDeviceIp(id) {
        console.log(id)
        const devicesIP = await knex('devices')
            .select('IPaddress')
            .where({ id: id });
        return `http://${devicesIP[0].IPaddress}/api`;
    },

}


