
const tempatureSensor = "http://192.168.0.201/api/controllers/processor/red"
const tempatureButton = document.querySelector("#tempature")


tempatureButton.addEventListener("click", async () => {
    //  const currentTemp = fetch(tempatureSensor)
    const data = await fetch('/currentTemp');
    const jsonData = await data.json();
    const currentTime = new Date();
    const dataObject = { currentTemp: jsonData, currentTime: currentTime.toLocaleDateString() };
    console.log('data: ', dataObject);
})