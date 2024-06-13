setInterval(()=>{

    fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    .then(res => res.json())
    .then(json => {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let timestamp = Date.parse(json.datetime);
        let date = new Date(timestamp);
        let year = date.getFullYear(); // prints the year (e.g. 2021)
        let month = months[date.getMonth()]; // prints the month (0-11, where 0 = January)
        let day = date.getDate(); // prints the day of the month (1-31)
        let hour = date.getHours(); // prints the hour (0-23)
        let min = date.getMinutes(); // prints the minute (0-59)
        let sec = date.getSeconds(); // prints the second (0-59)

        document.getElementById("displayDate").innerHTML = day + ", " + month + " " + year + "<br>" + hour+":"+min+":"+sec;

    })

},1000)


function getCurrentWeatherReport()
{   
    const city = document.getElementById("cityName").value;

    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=9a67710d25a248e3b44c5a1fa1391638")
    .then(res => res.json())
    .then(json => {
        let latitude = json[0].lat;
        let longitude = json[0].lon;

        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=9a67710d25a248e3b44c5a1fa1391638")
            .then(res => res.json())
            .then(json => 
                {
                    document.getElementById("report").style.display = "block";

                    document.getElementById("myCity").innerHTML = city.toUpperCase();

                    let temperature = (json.main.temp - 273.15).toFixed(1);
                    document.getElementById("temperature").innerHTML = temperature;
                
                    let wind = json.wind.speed.toFixed(1);
                    document.getElementById("wind").innerHTML = wind;

                    let humidity = json.main.humidity;
                    document.getElementById("humidity").innerHTML = humidity;
                    
                    let visibility = json.visibility;
                    document.getElementById("visibility").innerHTML = visibility;

                    let src = json.weather[0].icon;
                    let desc = json.weather[0].description;
                    {
                        let firstLetter = desc.charAt(0).toUpperCase();
                        let remainingLetters = desc.substring(1);
                        desc = firstLetter + remainingLetters;
                    }
                    
                    document.getElementById("weatherCnd").src="https://openweathermap.org/img/wn/" + src +"@2x.png";
                    document.getElementById("weatherDesc").innerHTML = desc;
                    console.log(json)
                    console.log("kya hua")
                
                })

    })
    
    
   
}

document.getElementById("enter").addEventListener("click",
    function()
    {
        getCurrentWeatherReport();
    }
)

function getLocation() 
{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
  
function showPosition(position) 
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=9a67710d25a248e3b44c5a1fa1391638")
    .then(res => res.json())
    .then(json => {

            document.getElementById("report").style.display = "block";

            let city = json.name;
            document.getElementById("myCity").innerHTML = city.toUpperCase();

            let temperature = (json.main.temp - 273.15).toFixed(1);
            document.getElementById("temperature").innerHTML = temperature;
        
            let wind = json.wind.speed.toFixed(1);
            document.getElementById("wind").innerHTML = wind;

            let humidity = json.main.humidity;
            document.getElementById("humidity").innerHTML = humidity;
            
            let visibility = json.visibility;
            document.getElementById("visibility").innerHTML = visibility;

            let src = json.weather[0].icon;
            let desc = json.weather[0].description;
            {
                let firstLetter = desc.charAt(0).toUpperCase();
                let remainingLetters = desc.substring(1);
                desc = firstLetter + remainingLetters;
            }
            
            document.getElementById("weatherCnd").src="https://openweathermap.org/img/wn/" + src +"@2x.png";
            document.getElementById("weatherDesc").innerHTML = desc;
            console.log(json)   

    })

}


document.getElementById("enterForecast").addEventListener("click",
    function(){

        const cityForecast = document.getElementById("cityForecast").value;
        const days = document.getElementById("days").value;
        console.log(days)

        fetch("http://api.weatherapi.com/v1/forecast.json?key=b6c462720ea9421a933195817241206&q="+cityForecast+"&days="+days+"&aqi=no&alerts=no")
            .then(res => res.json())
            .then(json => 
                {
                    /*document.getElementById("report").style.display = "block";

                    document.getElementById("myCity").innerHTML = city.toUpperCase();

                    let temperature = (json.main.temp - 273.15).toFixed(1);
                    document.getElementById("temperature").innerHTML = temperature;
                
                    let wind = json.wind.speed.toFixed(1);
                    document.getElementById("wind").innerHTML = wind;

                    let humidity = json.main.humidity;
                    document.getElementById("humidity").innerHTML = humidity;
                    
                    let visibility = json.visibility;
                    document.getElementById("visibility").innerHTML = visibility;

                    let src = json.weather[0].icon;
                    let desc = json.weather[0].description;
                    {
                        let firstLetter = desc.charAt(0).toUpperCase();
                        let remainingLetters = desc.substring(1);
                        desc = firstLetter + remainingLetters;
                    }
                    
                    document.getElementById("weatherCnd").src="https://openweathermap.org/img/wn/" + src +"@2x.png";
                    document.getElementById("weatherDesc").innerHTML = desc;*/
                    console.log(json.forecast)
                
                })
    }
    )

   