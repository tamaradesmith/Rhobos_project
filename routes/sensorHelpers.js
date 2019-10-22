const knex = require('../client');
const TemperatureCheck = require('../controller/tempatureCheck');
// const Controller = require('./controllerHelpers');
const lightLevel = require('../controller/lightLevel')

module.exports = {

  async bussnessLogic(sensorReading) {
    if (sensorReading.sensor === 'lux') {
      console.log("lux");
      const check = lightLevel(sensorReading)

    } else if (sensorReading.sensor === "temperature" && sensorReading.device === "inside") {
      const check = TemperatureCheck(sensorReading);
      console.log("reply: ", check);
    }
  },

}