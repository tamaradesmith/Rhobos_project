const Chart = require("chart.js");
 let ctx = document.getElementById("myChart");

const read = [
    { temperature: 21, time: 1 },
    { temperature: 20, time: 2 },
    { temperature: 18, time: 3 },
    { temperature: 21, time: 4 },
    { temperature: 23, time: 5 },
    { temperature: 22, time: 6 },
    { temperature: 21, time: 7 },
    { temperature: 19, time: 8 },
    { temperature: 18, time: 9 },
    { temperature: 21, time: 10 },
    { temperature: 20, time: 11 },
    { temperature: 18, time: 12 }
];

function readings(obj) {
    result = [];
    for (let temp of obj) {
        result.push(parseFloat(temp.temperature));
    }
    return result;
}

function timeReading(obj) {
    result = [];
    for (let temp of obj) {
        result.push(parseFloat(temp.time));
    }

    return result;
}


module.exports =  new Chart(ctx, {
    type: "line",
    data: {
        labels: timeReading(read),
        datasets: [
            {
                label: "Temperature",
                data: readings(read),
                borderColor: ["rgba(0, 0, 0,1)"],

                pointStyle: "rectRounded",
                radius: 8,
                fill: false
            },
            {
                label: "light levels",
                data: [15, 29, 17, 19, 20, 21, 23, 21, 20, 25, 20, 27],
                borderColor: ["rgba(0, 100, 50,1)"],
                radius: 5,
                fill: false
            },
            {
                label: "High Range",
                data: [27, 27, 27, 27, 26, 26, 26, 26, 26, 25, 25, 25],
                borderColor: ["rgba(200, 50, 50,1)"],
                radius: 5,
                backgroundColor: ["rgba(200, 50, 50,.5)"],
                fill: "top"
            },
            {
                label: "Lower Range",
                data: [17, 17, 17, 17, 18, 18, 19, 19, 19, 17, 17, 17],
                borderColor: ["rgba(200, 50, 50,1)"],
                radius: 5,
                backgroundColor: ["rgba(200, 50, 50,.5)"],
                fill: "bottom"
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 15,
                        max: 30,
                        stepSize: 1
                    }
                }
            ]
        }
    }
});