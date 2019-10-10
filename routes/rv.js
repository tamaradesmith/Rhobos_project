const knex = require('../client');
const express = require('express');
const router = express.Router();
const tempatureCheck = require('../controller/tempatureCheck');
const sensors = require("./sensorsHelpers")
const controller = require("./controllerHelpers")
const queries = require('../db/query.js')
const axios = require('axios');
const convert = require('xml-js');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Landing Page

router.get('/', (req, res) => {
    res.render('rv/chart', {
        reading: '',
    });
})



// Node page DSSS

router.get('/dsss', (req, res) => {
    knex("nodes")
        .select("id")
        .where({ name: "dsss" })
        .then((data) => {
            return knex("devices")
                .select("id")
                .where({ node_id: data[0].id, name: "colour" })
        }).then((data) => {
            return knex("sensors")
                .select("id")
                .where({ device_id: data[0].id, type: "red" })
        }).then((data) => {
            return knex("reading")
                .select("*")
                .where({ sensor_id: data[0].id })
                .orderBy('createdAt', 'desc')
                .limit(1)
        }).then((data) => {
            const reading = data[0]
            res.render('rv/chart', {
                reading: data[0]
            });

        })
});

// Controller routes


router.post('/boolean', async (req, res) => {
    const id = req.body.deviceID;
    const state = req.body.deviceState
    const deviceIp = await queries.getDeviceIp(id)
    await controller.booleanOpp(deviceIp, state)
    // uncatch prosie att about fixxing it.

})

// Information routes

// Current Tempature

router.get('/currentTemp', async (req, res) => {

    const url = "http://192.168.0.201/api/sensors/colour/red"
    const currentTemp = await axios.get(`${url}`);
    const jsonData = convert.xml2json(currentTemp.data, { compact: true, space: 4 });
    const parsedData = JSON.parse(jsonData);
    const currentTempValue = parsedData.reply.sensors.colour.red.value._text;
    console.info(currentTempValue);
    res.send(currentTempValue);

})

// get last temputature in DB

router.post('/tempSensor', (req, res) => {
    sensor.lastReading(req)

});



// Save Readings to DB


//Colour Sensors Save

router.post('/rs', (req, res) => {
    const postParams = {
        node: req.body.node,
        device: req.body.device,
        sensor: req.body.sensor,
        date: req.body.date,
        value: req.body.value
    };
    sensors.saveSensorReading(postParams)
    res.send(`sensors: ${postParams.sensor}`)

});


// Tempature sensor

router.post('/tempature', (req, res) => {
    console.log(req.body)
    // const postParams = {
    //     node: req.body.node,
    //     device: req.body.device,
    //     sensor: req.body.sensor,
    //     date: req.body.date,
    //     value: req.body.value
    // };
    // sensors.saveSensorReading(postParams)
    res.send(`sensors:`)

});




router.get('/test', (req, res) => {
    res.send("got it!")
})

module.exports = router;