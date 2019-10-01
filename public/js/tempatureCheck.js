const axios = require('axios');

const heater = "http://192.168.0.201/api/controllers/processor/red/";
const airCon = "http://192.168.0.201/api/controllers/processor/blue/";


module.exports =  (data) => {
    console.log(data.value);
    const tempature = data.value;
    if (tempature < 400 ){

        axios.post(heater + '1', {
            withCredentials: true
        });
        axios.post(airCon + '0', {
            withCredentials: true
        });

    } else if (tempature >= 400  && tempature < 810 ){
        axios.post(airCon + '0', {
            withCredentials: true
        });
        axios.post(heater + '0', {
            withCredentials: true
        });
    } else {
        axios.post(airCon + '1', {
            withCredentials: true
        });
        axios.post(heater + '0', {
            withCredentials: true
        });
    }
}