const knex = require('../../client');

module.exports = {
  async getOne(nodeId) {
    const nodeData = await knex("nodes")
      .select("*")
      .where({id: nodeId})
    return nodeData[0];
  },
  async getAll() {
    const nodeData = await knex("nodes")
      .select("*");
    return nodeData;
  },
  async getNodeIp(id) {
    const nodeIP = await knex('nodes')
      .select('*')
      .where({ id: id });
    return `http://${nodeIP[0].IPaddress}/api`;
  },
 async getNodeIpFromName(name){
    const nodeIP = await knex('nodes')
      .select('*')
      .where({ name: name });
    return `http://${nodeIP[0].IPaddress}/api`;
  },
};