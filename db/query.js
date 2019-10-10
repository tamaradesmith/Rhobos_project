const knex = require('../client');
const axios = require('axios');


module.exports = {
    getOne(id) {
        knex('device')
        console.log('get one')
    },
    getAll() {

        console.log('getall')
    },
    getDeviceIp(id) {
        // console.log("id ", id)
        return knex('devices')
            .select('IPaddress ')
            .where({ id: id })
            .then((devicesIP) => {
                return `http://${devicesIP[0].IPaddress}/api`
            })
    },

}


