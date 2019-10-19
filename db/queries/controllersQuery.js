
const knex = require('../../client');

// controller Queries

module.exports = {
    
    async getControllerByDevice(device_id){
        const controllersData = await knex("controllers")
            .select("*")
            .where({ device_id: device_id });
        return controllersData;
    },
    async getControllerFromId(controller_id) {
        const controllerData = await knex("controllers")
            .select("*")
            .where({ id: controller_id });
        return controllerData[0];
    },

}