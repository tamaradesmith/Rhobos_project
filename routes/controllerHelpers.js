const knex = require('../client');
const axios = require('axios');

module.exports = {

  async booleanOpp(url) {
    axios.post(url, {
      withCredentials: true
    });
    return "finished"
  },
  getValue(data) {
    const start = data.indexOf("<value>");
    const end = data.indexOf("</value>");
    return data.substring(start + 7, end);
  },
  async toggleState(deviceIp, controller) {
    const url = deviceIp + `/controllers/processor/${controller}`
    const stateParams = await axios.get(url)
    const currentstate = await this.getValue(stateParams.data)
    const state = (parseFloat(currentstate) !== 0) ? 0 : 1;
    await this.booleanOpp(url + `/${state}`)
    return 'controller toggled'
  }
}