
const knex = require('../../client');

// controller Queries

module.exports = {

    
    getValue(data){
        const start = data.indexOf("<value>");
        const end = data.indexOf("</value>");
        return data.substring(start + 7, end);
    },
    async getControllerByDevice(device_id){
        const ControllersData = await knex("controllers")
            .select("*")
            .where({ device_id: device_id });
        return ControllersData;
    },
}