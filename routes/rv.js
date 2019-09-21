const express = require('express');
const knex = require('../client');
const router = express.Router();


router.get('/', (req, res)=>{
    res.render('rv/chart')
})

router.get('/rv/reading', (req, res)=>{
    res.render('rv/reading')
})




router.post('/rs', (req, res) => {
     const postParams ={
         node: req.body.node,
         device: req.body.device,
         sensor: req.body.sensor,
         date: req.body.date,
         value: req.body.value
     }
    //  console.log(postParams.node)
    knex("nodes")
        .select("*")
        .where({ name: postParams.node })
        .then((data) => {
            // console.log(data)
            return knex("devices")
                .select("*")
                .where({ node_id: data[0].id , name: postParams.device})
        }).then((data) => {
            // console.log(data)
            return knex("sensors")
                .select("*")
                .where({ device_id: data[0].id, type: postParams.sensor })
            }).then((data) => {
                // console.log(data)
                knex("reading")
                 .insert([
                   { value: postParams.value,
                    time: postParams.date,
                    sensor_id: data[0].id}
                ])           
                .returning("*")
                .then((data)=>{
                    console.log(data)
                    // knex.destroy()
                    res.redirect('/rv/reading')
                })
        })
    //  console.log(postParams)
})

// router.post('/rs', (req, res)=>{
//     const senorParams =  {
//         temperature: req.body.value,
//         // device: req.body.device,
//         // node: req.body.node,
//     }
//     knex("temperatures")
//     .insert(senorParams)
//     .returning("*")
//     .then((data) =>{
//     console.log((senorParams.temperature))
//         // console.log(req.body.value)
//         res.redirect('/rv/reading')
//     })
// })


// router.get("/socket", (req, res) => {
//        res.render('rv/socket')
// })




module.exports = router;