const knex = require('../client');
const express = require('express');
const router = express.Router();
// const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Helper files
const Controller = require("./controllerHelpers");
const Sensor = require("./sensorHelpers");


// Query files
const SensorsQuery = require("../db/queries/sensorsQuery");
const ControllersQuery = require("../db/queries/controllersQuery");
const NodeQuery = require("../db/queries/nodeQuery");
const DeviceQuery = require('../db/queries/deviceQuery.js');








// Save Readings to DB

router.post('/sensors/readings', (req, res) => {
    const postParams = {
        node: req.body.node,
        device: req.body.device,
        sensor: req.body.sensor,
        date: req.body.date,
        value: req.body.value
    };
    SensorsQuery.saveSensorReading(postParams)
    Sensor.bussnessLogic(postParams);
    res.send(postParams.sensor)
});


// query Info

// nodes


// get one node

router.get('/nodes/:id', async (req, res) => {
    const nodeId = req.params.id
    const nodeData = await NodeQuery.getOne(nodeId)
    res.send(nodeData)
})

// get all Nodes
router.get('/nodes', async (req, res) => {

    const nodesData = await NodeQuery.getAll();
    res.send(nodesData);
});

// get all Devices on one Node
router.get('/nodes/:id/devices', async (req, res) => {

    const nodeId = req.params.id
    const deviceData = await DeviceQuery.getDevicesByNode(nodeId);
    res.send(deviceData)
})

// get all Sensors on one Node
router.get('/nodes/:id/sensors', async (req, res) => {
    const nodeId = req.params.id
    const sensorsData = await SensorsQuery.getSensorsByNode(nodeId);
    res.send(sensorsData)
})

// all sensor readings on one node

router.get('/nodes/:id/sensors/readings', async (req, res) => {
    const nodeId = req.params.id;
    const deviceData = await DeviceQuery.getDevicesByNode(nodeId);
    const sensorsData = await SensorsQuery.getSensorsfromDevices(deviceData);
    const allReadings = await SensorsQuery.getSensorsReading(sensorsData)
    res.send(allReadings)
});

// device

//  get all device
router.get('/devices', async (req, res) => {
    const deviceData = await DeviceQuery.getAllDevices()
    res.send(deviceData);
});

//  get one device info
router.get(`/device/:id`, async (req, res) => {
    const deviceId = req.params.id;
    const deviceData = await DeviceQuery.getOneDevice(deviceId);
    res.send(deviceData)
});

// get sensors on one device
router.get(`/devices/:id/sensors`, async (req, res) => {
    const deviceId = req.params.id;
    const sensorsData = await SensorsQuery.getSensorsByDevice(deviceId);
    res.send(sensorsData)
});

// get Controller on one device
router.get(`/devices/:id/controllers`, async (req, res) => {
    const deviceId = req.params.id;
    const controllersData = await ControllersQuery.getControllerByDevice(deviceId);
    res.send(controllersData)
});


//  Sensors

// get all readings of one sensor
router.get('/sensor/:id/readings', async (req, res) => {
    const sensor_id = req.params.id;
    const readings = await SensorsQuery.allReadings(sensor_id);
    res.send(readings)

});

// all sensor readings on one devise
router.get('/device/:id/sensors/readings', async (req, res) => {
    const deviceId = req.params.id;
    const sensorsData = await SensorsQuery.getSensorsByDevice(deviceId);
    const allReadings = await SensorsQuery.getSensorsReading(sensorsData)
    res.send(allReadings)
});


//  get last reading of a sensor in db

router.get('/sensor/:id/reading', async (req, res) => {
    const sensor_id = req.params.id;
    const reading = await SensorsQuery.lastReading(sensor_id);
    res.send(reading)
});


//  get last reading of all sensors on one node 

router.get('/nodes/:id/sensors/reading', async (req, res) => {
    const nodeId = req.params.id;
    const devices = await DeviceQuery.getDevicesByNode(nodeId);
    const sensorsData = await SensorsQuery.getSensorsfromDevices(devices);
    const reading = await SensorsQuery.lastReadingAllSensors(sensorsData);
    res.send(reading)
});


// Controller 

// Toggle on/off 

router.get('/controller/:id/boolean', async (req, res) => {
    const controllerId = req.params.id;
    const controllerData = await ControllersQuery.getControllerFromId(controllerId)
    const nodeId = await DeviceQuery.getNodeId(controllerData.device_id)
    const nodeIp = await NodeQuery.getNodeIp(nodeId);
    await Controller.toggleState(nodeIp, controllerData.name)
    res.send("finished")
})

// current state of Controllers 

router.get('/nodes/:id/controllers/state', async (req, res) => {
    const nodeId = req.params.id;
    const nodeIp = await NodeQuery.getNodeIp(nodeId);
    const allControllers = await ControllersQuery.getControllerByNode(nodeId);
    const controllersState = await Controller.getControllersStates(nodeIp, allControllers);
    res.send(controllersState);
})


// Information routes

// Current sensor reading

router.get('/sensor/:id/current', async (req, res) => {
    const sensorId = req.params.id;
    const sensorData = await SensorsQuery.getSensorFromId(sensorId);
    const deviceData = await DeviceQuery.getOneDevice(sensorData.device_id)
    const nodeId = await DeviceQuery.getNodeId(sensorData.device_id)
    const nodeIp = await NodeQuery.getNodeIp(nodeId)
 
    const reading = await SensorsQuery.currentReading(sensorData, deviceData[0], nodeIp)
    res.send(reading);

})


module.exports = router;