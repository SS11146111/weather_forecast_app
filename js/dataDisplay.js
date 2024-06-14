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

function displayData(){
    const storedValues = [];
    const storedKeys = [];
    const storedAirKeys = [];
    const storedAirValues = [];
    const storedLocKeys = [];
    const storedLocValues = [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const city = urlParams.get('city');
    fetch("http://api.weatherapi.com/v1/current.json?key=b6c462720ea9421a933195817241206&q="+city+"&aqi=yes")
    //fetch("http://api.weatherapi.com/v1/current.json?key=b6c462720ea9421a933195817241206&q=Guwahati&aqi=yes")
    .then(res => res.json())
    .then(json => {
        storedValues.push(json.current.uv,json.current.cloud,json.current.dewpoint_c,json.current.feelslike_c,json.current.heatindex_c,json.current.precip_in,json.current.pressure_in,json.current.wind_mph,json.current.wind_dir,json.current.wind_degree,json.current.gust_kph);
        storedKeys.push("UV index","Cloud","Dew point (c)","Temperature feels like (c)","Heat index(c)","Precipitation amount(in)","Pressure(in)","Wind(m/h)","Wind direction","wind degree","Wind gust(k/h)");
       
        let table1 = document.getElementById("table1");
        for(let i=0; i<storedKeys.length; i++)
        {
            let row = document.createElement("tr");
            let col1 = document.createElement("td");
            let col2 = document.createElement("td");
            col1.innerHTML = storedKeys[i];
            col1.style.padding = "2px";
            col2.innerHTML = storedValues[i];
            col2.style.padding = "2px";
            row.appendChild(col1);
            row.appendChild(col2);
            row.style.padding = "2px";
            table1.appendChild(row);
            table1.style.margin = "6px";
            row.classList.add("sides");
            col1.classList.add("sides");
            col2.classList.add("sides");
        }

        storedAirKeys.push("Carbon Monoxide (μg/m3)","Ozone (μg/m3)","Nitrogen dioxide (μg/m3)","Sulphur dioxide (μg/m3)","PM2.5 (μg/m3)","PM10 (μg/m3)");
        storedAirValues.push(json.current.air_quality.co,json.current.air_quality.o3,json.current.air_quality.no2,json.current.air_quality.so2,json.current.air_quality.pm2_5,json.current.air_quality.pm10)
       
        let table2 = document.getElementById("table2");
        for(let i=0; i<storedAirKeys.length; i++)
        {
            let row = document.createElement("tr");
            let col1 = document.createElement("td");
            let col2 = document.createElement("td");
            col1.innerHTML = storedAirKeys[i];
            col1.style.padding = "2px";
            col2.innerHTML = storedAirValues[i];
            col2.style.padding = "2px";
            row.appendChild(col1);
            row.appendChild(col2);
            row.style.padding = "2px";
            table2.appendChild(row);
            table2.style.margin = "6px";
            row.classList.add("sides");
            col1.classList.add("sides");
            col2.classList.add("sides");
        }

        console.log(json)
        storedLocKeys.push("Country","Latitude","Longitude","Local time","Local time epoch","City","Region","Time Zone");
        storedLocValues.push(json.location.country,json.location.lat,json.location.lon,json.location.localtime,json.location.localtime_epoch,json.location.name,json.location.region,json.location.tz_id)
       
        let table4 = document.getElementById("table4");
        for(let i=0; i<storedLocKeys.length; i++)
        {
            let row = document.createElement("tr");
            let col1 = document.createElement("td");
            let col2 = document.createElement("td");
            col1.innerHTML = storedLocKeys[i];
            col1.style.padding = "2px";
            col2.innerHTML = storedLocValues[i];
            col2.style.padding = "2px";
            row.appendChild(col1);
            row.appendChild(col2);
            row.style.padding = "2px";
            table4.appendChild(row);
            table4.style.margin = "6px";
            row.classList.add("sides");
            col1.classList.add("sides");
            col2.classList.add("sides");
        }
    })

}

displayData()

