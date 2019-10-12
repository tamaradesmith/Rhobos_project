const knex = require('../client');
const axios = require('axios');
// const convert = require('xml-js');


module.exports = {

  async booleanOpp(ip, state, name) {
    const url = ip + `/controllers/processor/${name}/` + state;
    axios.post(url, {
      withCredentials: true
    });
  }
}