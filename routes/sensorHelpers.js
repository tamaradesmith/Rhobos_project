const knex = require('../client');
const TemperatureCheck = require('../controller/tempatureCheck');
const Controller = require('./controllerHelpers');

module.exports = {

  async bussnessLogic(sensorReading) {
    if (sensorReading.sensor === 'lux') {
      console.log("lux");

    } else if (sensorReading.sensor === "temperature" && sensorReading.device === "inside") {
      const check = TemperatureCheck(sensorReading);
      console.log("reply: ", check);
      this.sensorAction(check, sensorReading);
    }
  },
  sensorAction(reading, sensorData) {
    switch (reading) {
      case "warm":
        console.log("turnning on airCon");
        Controller.turnOnAircon(sensorData);
        break;
      case "room":
        console.log("turning off all");
        Controller.turnOffAll(sensorData);
        break;
      case "cold":
        console.log("turn on heater");
        Controller.turnOnHeat(sensorData)
        break;
    }


  },

}