
const tempatureSensor = "http://192.168.0.201/api/controllers/processor/red";
const tempatureButton = document.querySelector("#tempature");



tempatureButton.addEventListener("click", async () => {
    console.log("click")
    const deviceID = 1;
    const sensorName = 'red';

    await fetch('/currentTemp', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ deviceID, sensorName })
    }).then(res => console.log("res: ", res));
})




// tempatureButton.addEventListener("click", async () => {
//     console.log("click")
//     //  const currentTemp = fetch(tempatureSensor)
//     const data = await fetch('/currentTemp');
//     const jsonData = await data.json();
//     const currentTime = new Date();
//     const dataObject = { currentTemp: jsonData, currentTime: currentTime.toLocaleDateString() };
//     console.log('data: ', dataObject);
// })