
const knex = require('../../client');

// controller Queries

module.exports = {
    async getControllerByNode(nodeId) {
        const devices = await knex("devices")
            .select("*")
            .where({ node_id: nodeId });
        const controllersData = await Promise.all(devices.map(async (device)=> {
            const controller = await this.getControllerByDevice(device.id)
            return controller;
        }))
        return controllersData;
    },
    async getControllerByDevice(device_id) {
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
    async getDefaultShow(controller){
        const defautShow = await knex("lightshows")
        .select("*")
        .where({controller_id: controller, default: true})
        .limit(1)
        return defautShow[0];
    }

}