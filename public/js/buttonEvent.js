const pump = document.querySelector("#pump")
// const url = "http://192.168.0.201/api/controllers/processor/pump/";
// const url = 'http://192.168.0.201/api/controllers/processor/red/'

pump.addEventListener("click", async () => {
    const controllerState = (pump.innerText === "ON") ? "0" : "1";
    pump.innerText = (pump.innerText === "ON") ? "OFF" : "ON";
    const deviceID = 1;
    const controllerName = 'red'

    try {
        await fetch('/boolean', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ deviceID, controllerState, controllerName })
        })

    } catch (err) {
        console.log(err)
    }
})