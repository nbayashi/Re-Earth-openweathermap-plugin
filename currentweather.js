
const html = `
<style>
.env-info{
  color:#666;
  font-size:18px
}
.weather_icon{
  display:block;
  margin:auto;
}
#temp{
  color:#666;
  font-size:40px
}
#temp_max{
  color:#CC3333;
  font-size:30px
}
#temp_min{
  color:#3366FF;
  font-size:30px
}

</style>
<p class="env-info">Current time</p>
<p class="env-info"><span id="data-fetch-time">-</span> </p>
<p class="env-info">Sunrise / Sunset</p>
<p class="env-info"><span id="sunrise">-</span> / <span id="sunset">-</span> </p>


<p class="env-info">Weather: <span id="weather">-</span></p>
<p class="env-info"><img src="" id="weather_icon" class="weather_icon"></p>
<p class="env-info">Temp: <span id="temp">-</span>(<span id="temp_max">-</span>/<span id="temp_min">-</span>)℃</p>
<p class="env-info">Humidity: <span id="humidity">-</span>%</p>
<p class="env-info">Pressure: <span id="pressure">-</span> hPa</p>

<div class="wind-line">
<p class="env-info"> Wind:
<svg width="15px" height="15px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" class="icon-wind-direction" id="icon-wind-direction" style="transform: rotate(0deg);">
<g fill="#48484a">
<path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path>
<path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path>
</g>
</svg>
<span id="wind_speed">-</span> m/s 
</p>
</div>

<p class="env-info">Visibility: <span id="visivility">-</span> km</p>

<script>
  let property, chart, chart2, temperature, humidity,fetchedData;
  
  function fetchData(){
    // if (!property) return Promise.resolve();
    const query_params = new URLSearchParams({
      id:property.cityId,
      appid:property.apiKey,
      units:"metric"});
    return fetch("https://api.openweathermap.org/data/2.5/weather?" + query_params
    ).then(r => {
          if (r.ok) return r.json();
        }).then(r => {
          if (!r) return;
          weatherData = r; 
          return weatherData;
        });
        }


  // function fetchData() {
  //   // if (!property) return Promise.resolve();
  //   return fetch(
  //     "http://api.openweathermap.org/data/2.5/weather?id=1853908&appid=eab978b11202cc3c9daa14445bb3648f&units=metric"
  //     // "http://api.openweathermap.org/data/2.5/weather?id=" + property.areaId + "&appid=" + property.apiKey+"&units=metric"
  //   ).then(response => {
  //     return response.json()
  //   }).then(r => {
  //     if (!r) return;
  //     fetchedData = r;
  //     console.log(fetchedData);
  //     return fetchedData;
  //   });
  // }


//   fetch("https://api.openweathermap.org/data/2.5/weather?" + query_params)
// .then(response => {
//     return response.json()
// })
// .then(data => {
//     console.log(data)
//     console.log(data.weather)
// })


  function updateLayers() {
    return fetchData().then(d => {
      if (!d) return;
      const data = d;
      console.log(data);
      console.log(data.weather[0]);
      console.log(data.weather[0].main);
      document.getElementById("data-fetch-time").textContent = getTime();
      document.getElementById("sunrise").textContent = unixTimeconv(data.sys.sunrise);
      document.getElementById("sunset").textContent = unixTimeconv(data.sys.sunset);
      document.getElementById("weather").textContent = data.weather[0].main;
      document.getElementById("weather_icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      document.getElementById("temp").textContent = data.main.temp.toFixed(1);
      document.getElementById("temp_max").textContent = data.main.temp_max.toFixed(1);
      document.getElementById("temp_min").textContent = data.main.temp_min.toFixed(1);
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("pressure").textContent = data.main.pressure;
      document.getElementById("wind_speed").textContent = data.wind.speed;
      document.getElementById("icon-wind-direction").style="transform: rotate(" +(data.wind.deg+180) + "deg);"
      document.getElementById("visivility").textContent = (data.visibility/1000).toPrecision(3);
      });
return;
  }


  function currentDatetime() {
    return new Date();
  }
  function formatDate(datetime) {
    return datetime.getFullYear() + "/" +
    (datetime.getMonth() + 1)  + "/" +
    datetime.getDate() + "  " +
    datetime.getHours() + ":" +
    datetime.getMinutes() + ":" + 
    datetime.getSeconds() + ""
  }
  function getTime() {
    return formatDate(currentDatetime());
  }

  function unixTimeconv(time){
    var dateTime = new Date(time*1000)
    return dateTime.toLocaleTimeString();
  }

window.addEventListener("message", e => {
  if (e.source !== parent) return;
  property = e.data.property;
  layers = e.source.reearth.layers.layers;
  if (property.area) {
    //TODO: add something
  }
  updateLayers();
});

</script >
  `;

reearth.ui.show(html);
reearth.on("update", send);
send();

function send() {
  if (reearth.block?.property?.default) {
    reearth.ui.postMessage({
      property: reearth.block.property.default,
      layers: reearth.layers.layers
    });
  }
}




l = reearth.layers.layers[1]
reearth.layers.hide(l.id);
tile2 = tiles[2]
reearth.visualizer.property.tiles.push[tile2]
tiles.splice(3, 1);