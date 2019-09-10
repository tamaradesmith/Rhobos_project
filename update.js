const knex = require('./client')

knex('temperatures')
    .insert(
        [{
            temperature: "21",
            time: '1'
        }, {
                temperature: "20",
                time: '2'
            }, {
                temperature: "18",
                time: '3'
            }, {
                temperature: "21",
                time: '4'
            }, {
                temperature: "23",
                time: '5'
            }, {
                temperature: "22",
                time: '6'
            }, {
                temperature: "21",
                time: '7'
            }, {
            temperature: "19",
            time: '8'
        },
            {
                temperature: "18",
                time: '9'
            }, {
                temperature: "21",
                time: '10'
            }, {
                temperature: "20",
                time: '11'
            }, {
                temperature: "18",
                time: '12'
            
            }]).returning('*')
        .then((data)=>{
            knex.destroy()
        })