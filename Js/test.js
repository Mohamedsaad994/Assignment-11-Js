
// var dataList =[];
let cityName = document.getElementById('cityName');
let cityTemp = document.getElementById('cityTemp');
let imgOfweather =document.getElementById('imgOfweather');
let weatherText = document.getElementById('weatherText');
let humidity =document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDir = document.getElementById('windDir');
let search= document.getElementById('search');
//     for(i=0; i<dataList.length;i++){
//         if(dataList[i].name.includes(searchLocation.value)){
//             console.log(dataList[i].name)
//         }
//     }
// })
let nextImg = document.getElementsByClassName('nextImg');
let maxTemp = document.getElementsByClassName('maxTemp');
let minTemp = document.getElementsByClassName('minTemp');
let nextTxt = document.getElementsByClassName('nextTxt');
let todayName= document.getElementById('todayName');
let todayNum= document.getElementById('todayNum');
let todayMonth= document.getElementById('todayMonth'); 
let nxtDay= document.getElementsByClassName('nxtDay')


async function getWeather(NameofCity){
    var result =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${NameofCity}&days=3`);
    var data =await result.json();
    return data;
    // console.log(dataList);
}

function displayTodayData(data){
    let todayDate = new Date();

    todayName.innerHTML=todayDate.toLocaleDateString('en-us',{weekday:'long'});
    todayNum.innerHTML= todayDate.getDate();
    todayMonth.innerHTML=todayDate.toLocaleDateString('en-us',{month:'long'});
    cityName.innerHTML= data.location.name;
    cityTemp.innerHTML= data.current.temp_c;
    imgOfweather.setAttribute("src",`https:${data.current.condition.icon}`);
    weatherText.innerHTML=data.current.condition.text;
    humidity.innerHTML= `${data.current.humidity}%`;
    wind.innerHTML=`${data.current.wind_kph}Km/h`;
    windDir.innerHTML=data.current.wind_dir
}
function displayNextData(data){
    let forecastData = data.forecast.forecastday;
    for(let i=0;i<2;i++){
        let nextDate = new Date(forecastData[i+1].date);
        nxtDay[i].innerHTML=nextDate.toLocaleDateString('en-us',{weekday:'long'});
        nextImg[i].setAttribute('src',`https:${forecastData[i+1].day.condition.icon}`);
        maxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c;
        minTemp[i].innerHTML=forecastData[i+1].day.mintemp_c;
        nextTxt[i].innerHTML=forecastData[i+1].day.condition.text
    }
    
}
async function allFunc(city="cairo"){
    let weatherData = await getWeather(city);
    displayTodayData(weatherData)
    displayNextData(weatherData)
}

allFunc()

search.addEventListener('input',function(){
    allFunc(search.value)
})
