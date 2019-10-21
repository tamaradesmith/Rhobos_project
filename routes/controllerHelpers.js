const knex = require('../client');
const axios = require('axios');
const NodeQuery = require('../db/queries/nodeQuery')

module.exports = {

  async booleanOpp(url) {
    axios.post(url, {
      withCredentials: true
    });
    return "finished"
  },
  async getControllerURLData(NodeIp, controllerName) {
    const url = NodeIp + `/controllers/processor/${controllerName}`;

    const stateParams = await axios.get(url);
    return await stateParams.data;
  },
  getValue(data) {
    const start = data.indexOf("<value>");
    const end = data.indexOf("</value>");
    return data.substring(start + 7, end);
  },

  async toggleState(nodeIp, controller) {
    const url = nodeIp + `/controllers/processor/${controller}`
    const stateParams = await axios.get(url)
    const currentstate = await this.getValue(stateParams.data)
    const state = (parseFloat(currentstate) !== 0) ? 0 : 1;
    await this.booleanOpp(url + `/${state}`)
    return 'controller toggled'
  },
  async getControllersStates(nodeIp, controllersArray) {
    controllersArray = controllersArray.flat()
    let states = await Promise.all(controllersArray.map((controller, i) => {
      return new Promise((res, rej) => {
        setTimeout(async () => {
          try {
            const controllerData = await this.getControllerURLData(nodeIp, controller.name);
            const value = await this.getValue(controllerData);
            controller.value = value;
            res(controller);
          } catch (error) {
            rej(error)
          }
        }, (i + 1) * 500 );
      })
    })).catch(err => { console.log("getState error: ", err.messages) })
    return states
  },

  // bussenss logic functions
  async turnOnAircon(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "ac";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    const turnOn = this.booleanOpp(url);
    this.turnOffHeat(sensorData);
  },
  async turnOnHeat(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "heater";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    const turnOn = this.booleanOpp(url);
    this.turnOffAircon(sensorData);
  },
  async turnOffAircon(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "ac";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
    const turnOn = this.booleanOpp(url);
  },
  async turnOffHeat(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "heater";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
    const turnOn = this.booleanOpp(url);
  },
  turnOffAll(sensorData) {
    this.turnOffAircon(sensorData);
    this.turnOffHeat(sensorData);

  },


}