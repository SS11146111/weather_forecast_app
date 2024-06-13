//display current date and time
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


//get current weather report on search
document.getElementById("enter").addEventListener("click",
    function()
    {
        const city = document.getElementById("cityName").value;
        getCurrentWeatherReport(city);
    }
)

function getCurrentWeatherReport(city)
{   
    fetch("http://api.weatherapi.com/v1/current.json?key=b6c462720ea9421a933195817241206&q="+city+"&aqi=no")
    //fetch("http://api.weatherapi.com/v1/current.json?key=b6c462720ea9421a933195817241206&q=Shillong&aqi=no")
    .then(res => res.json())
    .then(json => {
       
        document.getElementById("report").style.display = "block";

        document.getElementById("myCity").innerHTML = city.toUpperCase();

        let temperature = (json.current.temp_c).toFixed(1);
        document.getElementById("temperature").innerHTML = temperature;
    
        let wind = (json.current.wind_mph).toFixed(1);
        document.getElementById("wind").innerHTML = wind;

        let humidity = json.current.humidity;
        document.getElementById("humidity").innerHTML = humidity;
        
        let visibility = json.current.vis_km;
        document.getElementById("visibility").innerHTML = visibility;

        let src = json.current.condition.icon;
        let desc = json.current.condition.text;
        {
            let firstLetter = desc.charAt(0).toUpperCase();
            let remainingLetters = desc.substring(1);
            desc = firstLetter + remainingLetters;
        }
        
        document.getElementById("weatherCnd").src="http:"+src;
        document.getElementById("weatherDesc").innerHTML = desc;
    
    })
    .catch(() =>  {
        
        let div = document.getElementById("report")
        div.style.display = "block";
        div.innerHTML = "No matching location found";
        div.style.padding =  "16px";
        div.style.textAlign = "center";
        div.style.fontWeight = "bold";
        const img = document.createElement("img");
        img.src = "/images/not_found.png";
        div.appendChild(img);

    })
}

//get weather forecast by search
document.getElementById("cityForecast").addEventListener("change",
    function(){
        document.getElementById("enterForecast").addEventListener("click",
            function(){
                const cityForecast = document.getElementById("cityForecast").value;
                getForecast(cityForecast);
            })
})

function getForecast(city){
    document.getElementById("forecastReport").innerHTML = "";
    const days = document.getElementById("days").value;
    for(let i=1; i<=days; i++)
        {
            const div = document.createElement("div");
            div.className = "style";
            const parent = document.getElementById("forecastReport");
            parent.appendChild(div);
        }
    fetch("http://api.weatherapi.com/v1/forecast.json?key=b6c462720ea9421a933195817241206&q="+city+"&days="+days+"&aqi=no&alerts=no")
    //fetch("http://api.weatherapi.com/v1/forecast.json?key=b6c462720ea9421a933195817241206&q=Shillong&days="+days+"&aqi=no&alerts=no")
        .then(res => res.json())
        .then(json => 
            {
                for(let i = 0; i<days ; i++)
                {
                    const record = json.forecast.forecastday[i];

                    let day = "<tr><td class='text-black font-bold p-2 bg-slate-200'>Date:</td><td class='text-black font-bold bg-slate-200 mr-2'>"+record.date+"</td></tr>";
                    let max_temp = "<tr><td class='text-blue-800 font-bold p-2 flex flex-row '>Max Temp (c):</td><td>"+record.day.maxtemp_c+"</td></tr>";
                    let min_temp = "<tr><td class='text-blue-800 font-bold p-2 bg-slate-200'>Min Temp (c):</td><td class='bg-slate-200'>"+record.day.mintemp_c+"</td></tr>";
                    let max_wind = "<tr><td class='text-blue-800 font-bold p-2 '>Max Wind (m/h):</td><td>"+record.day.maxwind_mph+"</td></tr>";
                    let avg_vis = "<tr><td class='text-blue-800 font-bold p-2 bg-slate-200'>Avg Visibility (km):</td><td class='bg-slate-200'>"+record.day.avgvis_km+"</td></tr>";
                    let avg_humi = "<tr><td class='text-blue-800 font-bold p-2 '>Avg Humidity (%):</td><td>"+record.day.avghumidity+"</td></tr>";
                    let desc = "<p class='text-center text-white font-bold forecastCnd'>"+record.day.condition.text+"</p>";
                    let imgSrc =`<img src="http:`+record.day.condition.icon+`" width="60" height="40" class="forecastImg"/>`;

                    document.getElementsByClassName("style")[i].innerHTML = "<div class='bg-white mt-4 ml-4 mr-4 mb-1 rounded-md'><table>"+day+max_temp+min_temp+max_wind+avg_vis+avg_humi+"</table></div><div class='bg-blue-800 rounded-md m-1 ml-4 mr-4' >"+imgSrc+desc+"</div>";


                }
            }
        )
        .catch(() =>  {
        
                let div = document.getElementById("forecastReport")
                div.style.display = "block";
                div.innerHTML = "No matching location found";
                div.style.padding =  "10px";
                div.style.textAlign = "center";
                div.style.fontWeight = "bold";
                const img = document.createElement("img");
                img.src = "/images/not_found_2.png";
                img.id = "not_found";
                div.appendChild(img);
        })
}


//get city name from current location
function getCurrentByLocation() 
{
    
    if (navigator.geolocation) {
        
      navigator.geolocation.getCurrentPosition(showCity1);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
  
function showCity1(position) 
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+latitude+"&lon="+longitude+"&limit=1&appid=9a67710d25a248e3b44c5a1fa1391638")
        .then(res => res.json())
        .then(json => getCurrentWeatherReport(json[0].name))
}

function getForecastByLocation() 
{
    console.log("here")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCity2);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
  
function showCity2(position) 
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude,longitude)
    fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+latitude+"&lon="+longitude+"&limit=1&appid=9a67710d25a248e3b44c5a1fa1391638")
        .then(res => res.json())
        .then(json => getForecast(json[0].name))
}

document.getElementById("gfl").addEventListener("click",
    function(){
        document.getElementById("enterForecast").addEventListener("click",
            function(){
                getForecastByLocation();
            })
    }
)




