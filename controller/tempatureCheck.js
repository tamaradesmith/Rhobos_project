
const Controller = require('../routes/controllerHelpers');

module.exports = (data) => {

    const temperature = data.value;
    console.log("TCL: temperature", temperature)

    switch (true) {
        case temperature > 23.5:
            Controller.turnOnAircon(data);
            return "warm";
        case temperature > 23:
            Controller.turnOffHeat(data)
            return "heaterOff";
        case temperature > 22:
            Controller.turnOffAll(data);
            return "room";
        case temperature > 21:
            Controller.turnOffAircon(data);
            return "acOff";
        default:
            Controller.turnOnHeat(data);
            return "cold";
    };
};


