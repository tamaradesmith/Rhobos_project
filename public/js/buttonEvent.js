const pump = document.querySelector("#pump")
const pumpUrl = "http://192.168.0.201/api/controllers/processor/pump/";

pump.addEventListener("click", () => {
    if (pump.innerText === "ON") {
        pump.innerText = "OFF"
        fetch(pumpUrl + 'off', {
            mode: "no-cors",
            method: 'POST',
        })
    } else {
        pump.innerText = "ON";
        fetch(pumpUrl + '1', {
            method: 'POST',
            mode: "no-cors",

        })
    }
})


