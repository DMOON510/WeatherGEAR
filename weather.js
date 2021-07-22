/*press Go! to show the next page*/
(function(){
    'use strict';
    const go = document.getElementById('go');
    const sections = document.querySelectorAll('section');
    go.addEventListener('click', function() {
        sections[0].style.display = 'none';
        sections[1].style.display = 'block';
        getVal();
        });

})();

const apiKey = "56c2d9b70340e442af9fbad252aeafa3";

function getVal() {
    const input = document.querySelector(".searchbox");
    let city = input.value;
    
    fetchWeather(city);
  }

function fetchWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(weather => {
            if (!weather.ok){
                let error = document.querySelector(".error");
                document.getElementById("error").innerHTML = "No weather found ⚠︎ Please enter a valid city";
            }
            return weather.json();
        }).then(addWeather);
}

function addWeather(weather) {
    let city = document.querySelector('.city');
    document.getElementById("city").innerHTML = `${weather.name}, ${weather.sys.country}`
    let w = document.querySelector('.w');
    document.getElementById("w").innerHTML =  `${weather.weather[0].main}`;
    let temp = document.querySelector('.temp');
    document.getElementById("temp").innerHTML = `${Math.round((weather.main.temp) * 9 / 5 + 32)}°F`;
    let highlow = document.querySelector(".highlow");
    document.getElementById("highlow").innerHTML = `Low: ${Math.round((weather.main.temp_min)* 9 / 5 + 32)}°F / High: ${Math.round((weather.main.temp_max)* 9 / 5 + 32)}°F`;
    const icon = weather.weather[0].icon;
    document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + "@4x.png";
}
