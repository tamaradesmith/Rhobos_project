const knex = require('../../client');

module.exports = {
  async getAll() {
    const nodeData = await knex("nodes")
      .select("*");
    return nodeData;
  },

};