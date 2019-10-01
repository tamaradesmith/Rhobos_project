const knex = require('../client');
const express = require('express');
const router = express.Router();
const tempatureCheck = require('../public/js/tempatureCheck');
const axios = require('axios');
const convert = require('xml-js');

router.get('/', (req, res) => {
    res.render('rv/chart', {
        reading: '',
    });
})

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

router.get('/currentTemp', async (req, res) => {

    const url = "http://192.168.0.201/api/sensors/colour/red"
    const currentTemp = await axios.get(`${url}`);
    const jsonData = convert.xml2json(currentTemp.data, { compact: true, space: 4 });
    const parsedData = JSON.parse(jsonData);
    const currentTempValue = parsedData.reply.sensors.colour.red.value._text;
    console.info(currentTempValue);
    res.send(currentTempValue);

})

// get sensor reading

router.post('/rs', (req, res) => {
    const postParams = {
        node: req.body.node,
        device: req.body.device,
        sensor: req.body.sensor,
        date: req.body.date,
        value: req.body.value
    };
    knex("nodes")
        .select("*")
        .where({ name: postParams.node })
        .then((data) => {
            return knex("devices")
                .select("*")
                .where({ node_id: data[0].id, name: postParams.device })
        }).then((data) => {
            return knex("sensors")
                .select("*")
                .where({ device_id: data[0].id, type: postParams.sensor })
        }).then((data) => {
            knex("reading")
                .insert([
                    {
                        value: postParams.value,
                        time: postParams.date,
                        sensor_id: data[0].id
                    }
                ])
                .returning("*")
                .then((data) => {
                    res.send('Reading reseved');
                });
        });
});


router.post('/tempSensor', (req, res) => {
    const postParams = {
        node: req.body.node,
        device: req.body.device,
        sensor: req.body.sensor,
        date: req.body.date,
        value: req.body.value
    };
    knex("nodes")
        .select("*")
        .where({ name: postParams.node })
        .then((data) => {
            return knex("devices")
                .select("*")
                .where({ node_id: data[0].id, name: postParams.device })
        }).then((data) => {
            return knex("sensors")
                .select("*")
                .where({ device_id: data[0].id, type: postParams.sensor })
        }).then((data) => {
            knex("reading")
                .insert([
                    {
                        value: postParams.value,
                        time: postParams.date,
                        sensor_id: data[0].id
                    }
                ])
                .returning("*")
                .then((data) => {
                    tempatureCheck(data[0]);
                    res.send(' Tempature Reading reseved');
                });
        });
});


module.exports = router;