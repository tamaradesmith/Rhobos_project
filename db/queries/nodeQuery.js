const knex = require('../../client');

module.exports = {
  getAll() {
    return knex("nodes")
      .select("*")
      .then(nodeData => {
        return nodeData;
      });
  },

};