
const knex = require('../../client');
const axios = require('axios');

// controller Queries

module.exports = {

    
    getValue(data){
        const start = data.indexOf("<value>");
        const end = data.indexOf("</value>");
        return data.substring(start + 7, end);
    },
    getControllerByDevice(device_id){
        return knex("controllers")
        .select("*")
        .where({device_id: device_id})
        .then(ControllersData =>{
            return ControllersData;
        });
    },
}