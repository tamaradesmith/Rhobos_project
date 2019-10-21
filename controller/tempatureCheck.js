const axios = require('axios');

const heater = "http://192.168.0.201/api/controllers/processor/red/";
const airCon = "http://192.168.0.201/api/controllers/processor/blue/";


module.exports =  (data) => {
    console.log("current reading", data.value);
    const temperature = data.value;
    if (temperature > 22){
            return "warm"

    } else if (temperature >= 20 && temperature < 22 ){
        return "room"
    } else {
        return "cold"
    }
}