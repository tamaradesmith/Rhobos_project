const knex = require('../client');
const express = require('express');
const router = express.Router();
// const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Helper files
const Controller = require("./controllerHelpers")

// Query files
const SensorsQuery = require("../db/queries/sensorsQuery")
const ControllersQuery = require("../db/queries/controllersQuery")
const NodeQuery = require("../db/queries/nodeQuery")
const DeviceQuery = require('../db/queries/deviceQuery.js')



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
            // res.send({reading: data[0]});

        })
});

// Controller routes


router.post('/boolean', async (req, res) => {
    const id = req.body.deviceID;
    const state = req.body.controllerState;
    const name = req.body.controllerName;
    const deviceIp = await queries.getDeviceIp(id);
    await Controller.booleanOpp(deviceIp, state, name);


})

// Information routes

// Current Tempature

// router.get('/currentTemp', async (req, res) => {
//     console.log("route ")
//     const url = "http://192.168.0.201/api/sensors/colour/red"
//     const currentTemp = await axios.get(`${url}`);
//     const jsonData = convert.xml2json(currentTemp.data, { compact: true, space: 4 });
//     const parsedData = JSON.parse(jsonData);
//     const currentTempValue = parsedData.reply.sensors.colour.red.value._text;
//     console.info(currentTempValue);
//     res.send(currentTempValue);

// })
router.post('/currentTemp', async (req, res) => {
    const id = req.body.deviceID;
    const name = req.body.sensorName;
    const deviceIp = await DeviceQuery.getDeviceIp(id);
    const reading = await SensorsQuery.currentReading(name, deviceIp)
    // console.log("reading: ", reading)

    res.send(`${reading}`);

})

// get last temputature in DB

router.post('/tempSensor', (req, res) => {
    SensorsQuery.lastReading(req)

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
    SensorsQuery.saveSensorReading(postParams)
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
    // Sensors.saveSensorReading(postParams)
    res.send(`sensors:`)

});


// query Info

// nodes
router.get('/nodes', async (req, res) => {
    const nodesData = await NodeQuery.getAll();
    res.send(nodesData);
})

// device

//  get all device
router.get('/devices', async (req, res) => {
    const deviceData = await DeviceQuery.getAll()
    res.send(deviceData);
})

//  get one device
router.get(`/device/:id`, async (req, res) => {
    const id = req.params.id;
    const deviceData = await DeviceQuery.getOne(id);
    res.send(deviceData)
})

// get sensors on one device
router.get(`/devices/:id/sensors`, async (req, res) => {
    const id = req.params.id;
    const sensorsData = await SensorsQuery.getSensorsByDevice(id);
    res.send(sensorsData)
})

// get Controller on one device
router.get(`/devices/:id/controllers`, async (req, res) => {
    const id = req.params.id;
    const ControllersData = await ControllersQuery.getControllerByDevice(id);
    res.send(ControllersData)
})
module.exports = router;