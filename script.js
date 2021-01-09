
const BASE_URL = window.location.hostname.includes('localhost')
? 'http://localhost:5000'
: 'https://app-openweather.herokuapp.com'

var container = document.querySelector('.container')
var input = document.querySelector('.input-city')
var city = document.querySelector('.city')
var date = document.querySelector('.date')
var temp = document.querySelector('.temperature')
var icon = document.querySelector('.icon')

input.addEventListener('keypress', getInput)

function getInput(event) {
    if(event.keyCode == 13) {
        getResult(input.value)
        input.value = ''
    }
}

async function getResult (city) {

    var response

    fetch(`${BASE_URL}/${city}`, {
        method: 'GET',
        params: {
            city
        }
      })
      .then(async (serverResponse) => {
        if (serverResponse) {
            response = await serverResponse.json();
            
            setCity(response)
            setTemp(response)
            setWeather(response)
        } 
      });
}

function setCity(data) {
    city.innerHTML = `${data.name}, ${data.sys.country}`

    var options = { year: 'numeric', month: 'long', day: 'numeric'}
    
    date.innerHTML = new Date().toLocaleDateString(options)
}

function setTemp(data) {
    var temperature = data.main.temp.toFixed(1)
    temp.innerHTML = `${temperature}<sup>o</sup>C`
}

function setWeather(data) {
    icon.innerHTML = ''
    var img = document.createElement('img')
    img.classList.add('iconImg')
    img.src = `img/svg/${data.weather[0].main}.svg`
    icon.appendChild(img)
    container.style.backgroundImage = `url(img/${data.weather[0].main}.jpg)`
}

