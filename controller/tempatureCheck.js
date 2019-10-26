
const Controller = require('../routes/controllerHelpers');

module.exports = (data) => {

    const temperature = data.value;
    console.log("TCL: temperature", temperature)

    switch (true) {
        case temperature > 22:
            Controller.turnOnAircon(data);
            return "warm";
        case temperature > 21:
            Controller.turnOffHeat(data)
            return "heaterOff";
        case temperature > 20:
            Controller.turnOffAll(data);
            return "room";
        case temperature > 19:
            Controller.turnOffAircon(data);
            return "acOff";
        default:
            Controller.turnOnHeat(data);
            return "cold";
    };
};


