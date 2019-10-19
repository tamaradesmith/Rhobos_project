const knex = require('../client');
const axios = require('axios');

module.exports = {

  async booleanOpp(url) {
    axios.post(url, {
      withCredentials: true
    });
    return "finished"
  },
  async getControllerURLData(deviceIp, controllerName){
  const url = deviceIp + `/controllers/processor/${controllerName}`;
  const stateParams = await axios.get(url);
  return stateParams.data;
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
  },
  async getControllersStates(deviceIp, controllersArray){
    let states = await Promise.all(controllersArray.map(async controller =>{
      const controllerData = await this.getControllerURLData(deviceIp, controller.name)
      
      const value = await this.getValue(controllerData)
      controller.value = value
      return controller
    }))
    return states
  }

}