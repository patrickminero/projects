//apis info
// google autocomplete
let autocomplete;
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete')
    )
};

let openWeatherApi = {
    key: 'bb8fffb77c233d3391006cd4611ceda9',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
};

let openCageData = {
    key: '0c5b31fffada439ca3f7e208bfb56504',
    baseurl: 'https://api.opencagedata.com/geocode/v1/json?'
}
//variables
let recentArray = [];
let recentList = document.querySelectorAll('.recent');
let currentWeather = document.getElementById('current-weather');
let submitButton = document.getElementById('submit-button');
let currentIcon;
let metric = false;
let tempSymbol = 'ºF';
let speedSymbol = 'M/h';
//clear past data
let clearData = () =>{
    let hourDivList = document.querySelectorAll('#hourly-weather div');
    hourDivList.forEach((element)=>{    
        element.remove();
    })
    let dailyDivList = document.querySelectorAll('#daily-weather div');
    dailyDivList.forEach((element)=>{    
        element.remove();
    })
    let city = document.getElementById('autocomplete').value;
}
//save and retrieve recent searches to local storage
let saveData = (array) => {
    if(recentArray[0]){
        array[0].innerHTML = `<a>${recentArray[0]}</a>`
    }else{
        array[0].innerHTML = ``
    }
    if(recentArray[1]){
        array[1].innerHTML = `<a>${recentArray[1]}</a>`
    }else{
        array[1].innerHTML = ``
    }
    if(recentArray[2]){
        array[2].innerHTML = `<a>${recentArray[2]}</a>`
    }else{
        array[2].innerHTML = ``
    }
    if(recentArray.length > 3){
        recentArray.shift();
    }
    localStorage.setItem('city', JSON.stringify(recentArray));
}
//get data from openweather and opencagedata
async function infoRequest(lat, lon, err){
    if(err){
        console.log(err);
        alert(`Error! ${err}`)
    }else{
        let cityInfo = await(await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageData.key}`)).json();
        let data = await(await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApi.key}&units=imperial`)).json();
        let city = cityInfo.results[0].components
        document.getElementById('city').innerHTML = `${city.city}, ${city.country}`;
        let hourlyArray = data.hourly.slice(1, 11);
        let dailyArray = data.daily;
        displayCurrent(data.current);
        dailyArray.forEach(element => {new displayDaily(element)})
        hourlyArray.forEach(element => {new displayHourly(element);})
        saveData(recentList)
    }
}
// //convert city to coordinates with opencagedata API
async function cityToCoordinates(element, err){
    if(err){
        console.log(err);
        alert(`Error! ${err}`)
    }else{
        let data = await (await fetch(`${openCageData.baseurl}q=${element}&key=${openCageData.key}`)).json();
        let lat = data.results[0].geometry.lat;
        let lon = data.results[0].geometry.lng;
        let city = data.results[0].formatted;
        infoRequest(lat, lon, err);
        document.getElementById('autocomplete').value = '';
    }
}
//toggle units
let unitToggle = async () => {
    let element = recentArray[2];
    let data = await (await fetch(`${openCageData.baseurl}q=${element}&key=${openCageData.key}`)).json();
    let lat = data.results[0].geometry.lat;
    let lon = data.results[0].geometry.lng;

    if(metric === false){
        metric = true;
        tempSymbol = 'ºC';
        speedSymbol = 'K/h';
        document.querySelector('#units a').innerHTML = 'Change to Imperial';
        let metricData = await(await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApi.key}&units=metric`)).json();
        let hourlyArray = metricData.hourly.slice(1, 11);
        let dailyArray = metricData.daily;
        displayCurrent(metricData.current);
        clearData();
        dailyArray.forEach(element => {new displayDaily(element)});
        hourlyArray.forEach(element => {new displayHourly(element);});
        saveData(recentList);
    }else{
        metric = false
        tempSymbol = 'ºF';
        speedSymbol = 'M/h';
        document.querySelector('#units a').innerHTML = 'Change to metric';
        infoRequest(lat, lon);
        clearData();
    }
}
//event listeners
//click event
 document.getElementById('units').addEventListener('click', unitToggle);


recentList.forEach(element => {
    element.addEventListener('click', (e) => {
        let city = e.target.innerHTML;
        cityToCoordinates(city);
        clearData();
    })
})

submitButton.addEventListener('click', ()=>{
    clearData();
    cityToCoordinates(city);
    recentArray.push(city);
})
//keydown event
window.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13){
        clearData();
        let city = document.getElementById('autocomplete').value;
        cityToCoordinates(city);   
        recentArray.push(city);   
    };
})
//pass geolocation from navigator to weather api
let userLocation = (position) =>{
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    infoRequest(position.coords.latitude, position.coords.longitude)
}
//get geolocation on load event and add getting info from local storage
window.addEventListener('load', ()=>{
    window.navigator.geolocation.getCurrentPosition(userLocation);
    if(localStorage.length > 0){
        recentArray = JSON.parse(localStorage.getItem('city'))
    }
});
//Display current weather info
let displayCurrent = (obj) =>{
    let src;
    switch(obj.weather[0].main){
        case 'Thunderstorm':
            src = 'media/thunderstorm.svg'
        break;
        case 'Clear':
            src = 'media/clear-day.svg'
        break;
        case 'Drizzle':
            src = 'media/rain.svg'
        break;
        case 'Rain':
            src = 'media/rain.svg'
        break;
        case 'Snow':
            src = 'media/snow.svg'
        break;
        case 'Clouds':
            src = 'media/cloud-day.svg'
        break;        
    }
    document.getElementById('current-img').src = src;
    document.getElementById('current-desc').innerHTML = obj.weather[0].description;    
    document.getElementById('current-temp').innerHTML = obj.temp.toFixed(0) + ' ' + tempSymbol;    
    document.getElementById('current-feels').innerHTML = obj.feels_like.toFixed(0) + ' ' + tempSymbol;    
    document.getElementById('current-wind').innerHTML = obj.wind_speed.toFixed(0) + ' ' + speedSymbol;
}
//display hourly information
class displayHourly{
    constructor(element){    
        this.hour = new Date(element.dt * 1000).getHours();
        this.title = `${this.hour}:00`
        this.src;
        this.temp = 'Temperature: ' + element.temp.toFixed(0) + ' ' + tempSymbol;
        this.feels = 'Feels like: ' + element.feels_like.toFixed(0) + ' ' + tempSymbol;
        this.precipitation = 'Precipitation: ' + element.pop.toFixed(0) + '%';
        this.wind = 'Wind: ' + element.wind_speed.toFixed(0) + ' ' + speedSymbol;
        switch(element.weather[0].main){
            case 'Thunderstorm':
                this.src = 'media/thunderstorm.svg'
            break;
            case 'Clear':
                this.src = 'media/clear-day.svg'
            break;
            case 'Drizzle':
                this.src = 'media/rain.svg'
            break;
            case 'Rain':
                this.src = 'media/rain.svg'
            break;
            case 'Snow':
                this.src = 'media/snow.svg'
            break;
            case 'Clouds':
                this.src = 'media/cloud-day.svg'
            break;        
        }
        this.createDivs()
    }
    createDivs() {
        let div = document.createElement('div');
        let title = document.createElement('h2');
        let img = document.createElement('img');
        let temp = document.createElement('h3');
        let feels = document.createElement('h3');
        // let minmax = document.createElement('h3');
        let wind = document.createElement('h3');
        let precipitation = document.createElement('h3');

        div.classList.add('hour-div');
        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(temp);
        div.appendChild(feels)
        // div.appendChild(minmax)
        div.appendChild(precipitation);
        div.appendChild(wind);
        document.getElementById('hourly-weather').appendChild(div);

        title.innerHTML = this.title;
        img.src = this.src;
        temp.innerHTML = this.temp;
        feels.innerHTML = this.feels;
        wind.innerHTML = this.wind;
        precipitation.innerHTML = this.precipitation;
    }
}
class displayDaily{
    constructor(element){    
        //add title to each element
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = new Date(element.dt * 1000).getDay()
        this.title = days[day];
        this.src;
        this.temp = 'Min / Max: ' + element.temp.min.toFixed(0) + tempSymbol + ' ' + element.temp.max.toFixed(0) + tempSymbol;
        this.feels = 'Feels like: ' + element.feels_like.day.toFixed(0) + ' ' + tempSymbol;
        this.precipitation = 'Precipitation: ' + element.pop.toFixed(0) + '%';
        this.wind = 'Wind: ' + element.wind_speed.toFixed(0) + ' ' + speedSymbol;
        switch(element.weather[0].main){
            case 'Thunderstorm':
                this.src = 'media/thunderstorm.svg'
            break;
            case 'Clear':
                this.src = 'media/clear-day.svg'
            break;
            case 'Drizzle':
                this.src = 'media/rain.svg'
            break;
            case 'Rain':
                this.src = 'media/rain.svg'
            break;
            case 'Snow':
                this.src = 'media/snow.svg'
            break;
            case 'Clouds':
                this.src = 'media/cloud-day.svg'
            break;        
        }
        this.createDivs()
    }
    createDivs() {
        let div = document.createElement('div'); 
        let title =document.createElement('h2');
        let img = document.createElement('img');
        let temp =document.createElement('h3');
        let feels =document.createElement('h3');
        let wind =document.createElement('h3');
        let precipitation =document.createElement('h3');

        div.classList.add('hour-div');
        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(temp);
        div.appendChild(feels)
        div.appendChild(precipitation);
        div.appendChild(wind);
        document.getElementById('daily-weather').appendChild(div);

        title.innerHTML = this.title;
        img.src = this.src;
        temp.innerHTML = this.temp;
        feels.innerHTML = this.feels;
        wind.innerHTML = this.wind;
        precipitation.innerHTML = this.precipitation;
    }
}
//navbar animation
let menuBtn = document.getElementById('menu-button');
let sideNav = document.getElementById('side-nav');

let menuToggle = () =>{
    if(sideNav.style.display === 'block'){
        gsap.to('#side-nav', {display: 'none', opacity: 0, width: 0, duration: 1, ease: 'back'})
        gsap.to('#top', {rotate: -360, y: 0, backgroundColor: 'white', duration: 1});
        gsap.to('#bottom', {rotate: 360, y: 0, backgroundColor: 'white', duration: 1}); 
        gsap.to('#middle', {opacity: 1, duration: 1, backgroundColor: 'white'})
        gsap.to('body', {overflow: 'initial', duration: 1})
    }else{
        gsap.to('#side-nav', {display: 'block', opacity: 1, width: 300, duration: 1, ease: 'back'})
        gsap.to('#middle', {opacity: 0, backgroundColor: '#fff', duration: 1});    
        gsap.to('#top', {rotate: 405, y: 16, backgroundColor: '#fff', duration: 1});    
        gsap.to('#bottom', {rotate: -405, y: -14, backgroundColor: '#fff', duration: 1});    
        gsap.to('body', {overflow: 'hidden', duration: 1})
    }
}
menuBtn.addEventListener('click', menuToggle);
sideNav.addEventListener('click', menuToggle);