const knex = require('../../client');
const axios = require('axios');


module.exports = {
    getOne(id) {
        // console.log("id: ", id)
        return knex('devices')
            .select("*")
            .where({ id: id })
            .then(deviceData =>{
                return deviceData;
            })
    },
    getAll() {
        return knex('devices')
        .select("*")
        .then(devicesData =>{
            return devicesData;
        })
    },
    getDeviceIp(id) {
        console.log(id)
        return knex('devices')
            .select('IPaddress')
            .where({ id: id })
            .then((devicesIP) => {
                return `http://${devicesIP[0].IPaddress}/api`
            })
    },

}


