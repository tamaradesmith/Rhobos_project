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
    async getDevicesByNode(nodeId) {
        const nodeData = await knex("devices")
            .select("*")
            .where({node_id: nodeId})
        return nodeData;
    },
    async getNodeId(deviceId) {
        const nodeId = await knex('devices')
            .select('node_id')
            .where({ id: deviceId })
            .limit(1)
        return nodeId[0].node_id
    },
}


