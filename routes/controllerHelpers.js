const knex = require('../client');
const axios = require('axios');
const convert = require('xml-js');


module.exports = {

  async booleanOpp(ip, state) {
    const url = ip + `controllers/processor/red/` + state
    axios.post(url, {
      withCredentials: true
    });
  }
}