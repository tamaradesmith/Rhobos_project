const knex = require("../../client")

 function temperatureData(callback) {
    const result = [];

    return knex("temperatures")
        .select('*')
        .then((data) => {
            data.forEach(element => {
                result.push({ temperature: element.temperature, time: element.createdAt })
            })
            knex.destroy()
            callback(result)
        })

    // return result;
}

let temperatures = temperatureData((data) => { console.log(data) })

console.log(temperatureData( (tempData) => { console.log("THIS IS THE TEMP DATA==>", tempData) }))

// module.exports = temperatureData()