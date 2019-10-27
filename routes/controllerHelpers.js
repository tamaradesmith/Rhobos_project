const knex = require('../client');
const axios = require('axios');
const NodeQuery = require('../db/queries/nodeQuery');
const ControllerQuery = require('../db/queries/controllersQuery');

module.exports = {

  async booleanOpp(url) {
    axios.post(url, {
      withCredentials: true
    });
    return "finished";
  },
  async getControllerURLData(NodeIp, controllerName) {
    const url = `${NodeIp}/controllers/processor/${controllerName}`;
    const stateParams = await axios.get(url);
    return await stateParams.data;
  },
  getValue(data) {
    const start = data.indexOf("<value>");
    const end = data.indexOf("</value>");
    return data.substring(start + 7, end);
  },

  async toggleState(nodeIp, controller) {
    const url = `${nodeIp}/controllers/processor/${controller}`
    const stateParams = await axios.get(url);
    const currentstate = await this.getValue(stateParams.data);
    const state = (parseFloat(currentstate) !== 0) ? 0 : 1;
    await this.booleanOpp(`${url}/${state}`);
    return 'controller toggled';
  },
  async lightshowToggle(nodeIp, controllerData) {
    const defaultShow = await ControllerQuery.getDefaultShow(controllerData.id);
    const url = `${nodeIp}/colourapp/shows/${defaultShow.name}/active`;
    const stateParams = await axios.get(url);
    const currentstate = await this.getValue(stateParams.data);
    const state = (currentstate !== 'On') ? "On" : "Off";
    await this.booleanOpp(`${url}/${state}`);
    return 'lighting show toggled';
  },
  async getControllersStates(nodeIp, controllersArray) {
    controllersArray = controllersArray.flat();
    let states = await Promise.all(controllersArray.map((controller, i) => {
      return new Promise((res, rej) => {
        setTimeout(async () => {
          try {
            const controllerData = await this.getControllerURLData(nodeIp, controller.name);
            const value = await this.getValue(controllerData);
            controller.value = value;
            res(controller);
          } catch (error) {
            rej(error);
          }
        }, (i + 1) * 400);
      })
    })).catch(err => { console.log("getState error: ", err.messages) });
    return states;
  },
  // bussenss logic functions

  //  Temperature
  async turnOnAircon(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    setTimeout(() => {
      this.turnOnFan(nodeIp);
    }, 500);
    const controller = "ac";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    this.booleanOpp(url);
    this.turnOffHeat(sensorData);
  },
  async turnOnHeat(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    // setTimeout(() => {
    //   this.turnOnFan(nodeIp);
    // }, 500);
    const controller = "heater";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    this.booleanOpp(url);
    this.turnOffAircon(sensorData);
  },
  async turnOnFan(nodeIp) {
    const controller = "fan";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    this.booleanOpp(url);
  },
  async turnOffAircon(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
     setTimeout(() => {
      this.turnOffFan(nodeIp);
    }, 500);
    const controller = "ac";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
    this.booleanOpp(url);
  },
  async turnOffHeat(sensorData) {
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "heater";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
   this.booleanOpp(url);
  },
  async turnOffFan(nodeIp) {
    const controller = "fan";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
    this.booleanOpp(url);
  },
  turnOffAll(sensorData) {

    this.turnOffAircon(sensorData);
    setTimeout(() => {
      this.turnOffHeat(sensorData);
    }, 500);
   setTimeout(async() => {
      const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
      this.turnOffFan(nodeIp);
    }, 700);
  },

  // Light Levels
  async turnAllFeaturesOff(sensorData) {
    console.log("turning off");
    this.turnOffLights(sensorData);
    setTimeout(() => {
      this.turnOffWaterFeature(sensorData);
    }, 500);
  },
  async turnOnLights(sensorData) {
    console.log("turning on lights");
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const light = await ControllerQuery.getDefaultShowByReading(sensorData);
    const url = `${nodeIp}/colourapp/shows/${light.name}/active/On`;
    this.booleanOpp(url);
  },
  async turnOnWaterFeature(sensorData) {
    console.log("turning on water");
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "pump";
    const url = `${nodeIp}/controllers/processor/${controller}/1`;
    this.booleanOpp(url);
  },
  async turnOffLights(sensorData) {
    console.log("turning lights off");
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const light = await ControllerQuery.getDefaultShowByReading(sensorData);
    const url = `${nodeIp}/colourapp/shows/${light.name}/active/Off`;
    this.booleanOpp(url);
  },
  async turnOffWaterFeature(sensorData) {
    console.log("turning water off");
    const nodeIp = await NodeQuery.getNodeIpFromName(sensorData.node);
    const controller = "pump";
    const url = `${nodeIp}/controllers/processor/${controller}/0`;
    this.booleanOpp(url);
  },

}