
const knex = require('../../client');

// controller Queries

module.exports = {
    async getControllerByNode(nodeId) {
        const devices = await knex("devices")
            .select("*")
            .where({ node_id: nodeId });
        const controllersData = await Promise.all(devices.map(async (device) => {
            const controller = await this.getControllerByDevice(device.id)
            return controller;
        }))
        return controllersData;
    },
    async getControllerByNodeName(readingData) {
        const node = await knex("nodes")
            .select("*")
            .where({ name: readingData.node });
        const device = await knex("devices")
            .select("*")
            .where({ node_id: node[0].id, type: "led" });
        const controller = await knex("controllers")
            .select("*")
            .where({ device_id: device[0].id, type: "LED" })
            .orderBy("id", "asc");
        return controller[0];
    },
    async getControllerByDevice(device_id) {
        const controllersData = await knex("controllers")
            .select("*")
            .where({ device_id: device_id })
            .orderBy("id" , "asc");
        return controllersData;
    },
    async getControllerFromId(controller_id) {
        const controllerData = await knex("controllers")
            .select("*")
            .where({ id: controller_id })
            .orderBy("id", "asc");
        return controllerData[0];
    },
    async getDefaultShow(controllerId) {
        const defautShow = await knex("lightshows")
            .select("*")
            .where({ controller_id: controllerId, default: true })
            .limit(1);
        return defautShow[0];
    },
    async getLightShows(controllerId) {
        const shows = await knex("lightshows")
            .select("*")
            .where({ controller_id: controllerId })
            .orderBy("id", "asc")
        return shows;
    },
    async changeDefaultShow(showId) {
        const show = await knex("lightshows")
            .select("*")
            .where({ id: showId })
        await knex("lightshows")
            .where({ controller_id: show[0].controller_id })
            .update({ default: false })
            .returning("*")
        const newDefault = await knex("lightshows")
            .where({ id: showId })
            .update({ default: true })
            .returning("*")
        return newDefault[0];
    },
    async getDefaultShowByReading(sensorData) {
        const controller = await this.getControllerByNodeName(sensorData)
        const show = await this.getDefaultShow(controller.id)
        return show;
    },
}