let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector(".search-btn");
let load = document.querySelector(".load")



//search for city
searchBtn.addEventListener("click", function() {
    let city = searchInput.value
    if(city === ""){
        Swal.fire("Please enter a city name!");
    }
    else {
        getWeather(city)
    }
})


//fetch data from API
async function getWeather(city) {
    load.classList.replace("d-none", "d-flex")
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=687ca7c6803a4c7d89c223654262904&q=${city}&days=3`)
    console.log(response)
    if(response.ok === false){
        Swal.fire({
            icon: "error",
            text: "City not found!",
        });
        load.classList.replace("d-flex", "d-none")
    }
    else {
        let data = await response.json()
        displayWeather(data)
        load.classList.replace("d-flex", "d-none")
        searchInput.value = ""
    }
}
getWeather("cairo")


//display data in page
function displayWeather(data) {
    let box= ''
        box += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <span class="day">${new Date(data.location.localtime).toLocaleString('en-US', {weekday: "long"})}</span>
                        <span class="date">${new Date(data.location.localtime).toLocaleString('en-US', {month: 'long'})} ${new Date(data.location.localtime).getDate()}</span>
                    </div>
                    <div class="card-body">
                        <h2 class="city">${data.location.name}</h2>
                        <p class="number text-center">${data.current.temp_c}<sup>o</sup>C</p>
                        <img src='https://${data.current.condition.icon}' alt="${data.current.condition.text}">
                        <p class="description">${data.current.condition.text}</p>
                    </div>
                    <div class="card-footer border-0 d-flex align-items-center gap-3">
                        <span><img src="images/icon-umberella.png" alt="Humidity"> ${data.current.humidity}%</span>
                        <span><img src="images/icon-wind.png" alt="Wind">${data.current.wind_kph}km/h</span>
                        <span><img src="images/icon-compass.png" alt="Wind Direction">${data.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        `


        box += `
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-header d-flex align-items-center justify-content-center">
                        <span class="day">${new Date(data.forecast.forecastday[1].date).toLocaleString('en-US', {weekday: "long"})}</span>
                    </div>
                    <div class="card-body">
                        <img src='https://${data.forecast.forecastday[1].day.condition.icon}' alt="${data.forecast.forecastday[1].day.condition.text}">
                        <p class="max-number mb-0">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                        <p class="min-number">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                        <p class="description">${data.forecast.forecastday[1].day.condition.text}</p>
                    </div>
                </div>
            </div>
        `


        box += `
            <div class="col-md-4">
                <div class="card text-center">
                    <div class="card-header d-flex align-items-center justify-content-center">
                        <span class="day">${new Date(data.forecast.forecastday[2].date).toLocaleString('en-US', {weekday: "long"})}</span>
                    </div>
                    <div class="card-body">
                        <img src='https://${data.forecast.forecastday[2].day.condition.icon}' alt="${data.forecast.forecastday[1].day.condition.text}">
                        <p class="max-number mb-0">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                        <p class="min-number">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                        <p class="description">${data.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                </div>
            </div>
        `
    document.querySelector(".result-box").innerHTML = box;
}