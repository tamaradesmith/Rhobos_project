const express = require('express');
const knex = require('../client');
const router = express.Router();
const createChart = require('../public/js/createChart')


router.get("/", (req, res)=>{
const chartData = createChart()
    res.render('rv/chart', {
        chartData   
    })
})





module.exports = router;