const knex = require('../client');
const TemperatureCheck = require('../controller/tempatureCheck');
const lightLevel = require('../controller/lightLevel')

module.exports = {

  bussnessLogic(sensorReading) {
    if (sensorReading.sensor === 'lux') {
      lightLevel(sensorReading)
    } else if (sensorReading.sensor === "temperature" && sensorReading.device === "inside") {
      TemperatureCheck(sensorReading);
    }
  },

}