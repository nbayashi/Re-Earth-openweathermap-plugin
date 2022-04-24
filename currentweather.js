
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

<p class="env-info">
<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<g>
	<path style="fill:#F0C419;" d="M30,3c-0.552,0-1,0.448-1,1v6c0,0.552,0.448,1,1,1s1-0.448,1-1V4C31,3.448,30.552,3,30,3z"/>
	<path style="fill:#F0C419;" d="M59,32h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S59.552,32,59,32z"/>
	<path style="fill:#F0C419;" d="M7,32H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S7.552,32,7,32z"/>
	<path style="fill:#F0C419;" d="M52.707,10.293c-0.391-0.391-1.023-0.391-1.414,0l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.736-5.736C53.098,11.316,53.098,10.684,52.707,10.293z"/>
	<path style="fill:#F0C419;" d="M8.707,10.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l5.736,5.736   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L8.707,10.293z"/>
	<path style="fill:#F0C419;" d="M54.854,22.45c-0.216-0.508-0.804-0.746-1.311-0.53l-2.762,1.172   c-0.508,0.216-0.746,0.803-0.53,1.311c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08l2.762-1.172   C54.832,23.545,55.069,22.958,54.854,22.45z"/>
	<path style="fill:#F0C419;" d="M9.049,23.457l-2.782-1.124c-0.512-0.207-1.095,0.04-1.302,0.553   c-0.207,0.512,0.041,1.095,0.553,1.302L8.3,25.312c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626   C9.809,24.247,9.562,23.664,9.049,23.457z"/>
	<path style="fill:#F0C419;" d="M20.761,8.676c-0.216-0.509-0.804-0.747-1.311-0.53c-0.508,0.216-0.746,0.803-0.53,1.311   l1.172,2.762c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08c0.508-0.216,0.746-0.803,0.53-1.311L20.761,8.676z"/>
	<path style="fill:#F0C419;" d="M40.114,7.966c-0.511-0.207-1.095,0.041-1.302,0.553L37.688,11.3   c-0.207,0.512,0.041,1.095,0.553,1.302c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626l1.124-2.782   C40.874,8.756,40.626,8.173,40.114,7.966z"/>
</g>
<path style="fill:#F0C419;" d="M48.325,41C49.396,38.549,50,35.846,50,33c0-11.046-8.954-20-20-20s-20,8.954-20,20  c0,2.846,0.604,5.549,1.675,8H48.325z"/>
<path style="fill:#EDE21B;" d="M42.673,41C44.139,38.683,45,35.945,45,33c0-8.284-6.716-15-15-15s-15,6.716-15,15  c0,2.945,0.861,5.683,2.327,8H42.673z"/>
<g>
	<path style="fill:#1fcff2;" d="M59,40H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h58c0.552,0,1-0.448,1-1S59.552,40,59,40z"/>
	<path style="fill:#1fcff2;" d="M54,45H6c-0.552,0-1,0.448-1,1s0.448,1,1,1h48c0.552,0,1-0.448,1-1S54.552,45,54,45z"/>
	<path style="fill:#1fcff2;" d="M49,50H11c-0.552,0-1,0.448-1,1s0.448,1,1,1h38c0.552,0,1-0.448,1-1S49.552,50,49,50z"/>
	<path style="fill:#1fcff2;" d="M45,55H15c-0.552,0-1,0.448-1,1s0.448,1,1,1h30c0.552,0,1-0.448,1-1S45.552,55,45,55z"/>
</g>
<polygon style="fill:#546A79;" points="36.293,28.293 31,33.586 31,22 29,22 29,33.586 23.707,28.293 22.293,29.707 30,37.414   37.707,29.707 " transform="rotate(180,30,29.707)"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
<span id="sunrise">-</span> / 
<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<g>
	<path style="fill:#F0C419;" d="M30,3c-0.552,0-1,0.448-1,1v6c0,0.552,0.448,1,1,1s1-0.448,1-1V4C31,3.448,30.552,3,30,3z"/>
	<path style="fill:#F0C419;" d="M59,32h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S59.552,32,59,32z"/>
	<path style="fill:#F0C419;" d="M7,32H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h6c0.552,0,1-0.448,1-1S7.552,32,7,32z"/>
	<path style="fill:#F0C419;" d="M52.707,10.293c-0.391-0.391-1.023-0.391-1.414,0l-5.736,5.736c-0.391,0.391-0.391,1.023,0,1.414   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.736-5.736C53.098,11.316,53.098,10.684,52.707,10.293z"/>
	<path style="fill:#F0C419;" d="M8.707,10.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l5.736,5.736   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L8.707,10.293z"/>
	<path style="fill:#F0C419;" d="M54.854,22.45c-0.216-0.508-0.804-0.746-1.311-0.53l-2.762,1.172   c-0.508,0.216-0.746,0.803-0.53,1.311c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08l2.762-1.172   C54.832,23.545,55.069,22.958,54.854,22.45z"/>
	<path style="fill:#F0C419;" d="M9.049,23.457l-2.782-1.124c-0.512-0.207-1.095,0.04-1.302,0.553   c-0.207,0.512,0.041,1.095,0.553,1.302L8.3,25.312c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626   C9.809,24.247,9.562,23.664,9.049,23.457z"/>
	<path style="fill:#F0C419;" d="M20.761,8.676c-0.216-0.509-0.804-0.747-1.311-0.53c-0.508,0.216-0.746,0.803-0.53,1.311   l1.172,2.762c0.162,0.381,0.532,0.61,0.921,0.61c0.13,0,0.263-0.026,0.39-0.08c0.508-0.216,0.746-0.803,0.53-1.311L20.761,8.676z"/>
	<path style="fill:#F0C419;" d="M40.114,7.966c-0.511-0.207-1.095,0.041-1.302,0.553L37.688,11.3   c-0.207,0.512,0.041,1.095,0.553,1.302c0.123,0.049,0.25,0.073,0.374,0.073c0.396,0,0.771-0.236,0.928-0.626l1.124-2.782   C40.874,8.756,40.626,8.173,40.114,7.966z"/>
</g>
<path style="fill:#F0C419;" d="M48.325,41C49.396,38.549,50,35.846,50,33c0-11.046-8.954-20-20-20s-20,8.954-20,20  c0,2.846,0.604,5.549,1.675,8H48.325z"/>
<path style="fill:#EDE21B;" d="M42.673,41C44.139,38.683,45,35.945,45,33c0-8.284-6.716-15-15-15s-15,6.716-15,15  c0,2.945,0.861,5.683,2.327,8H42.673z"/>
<g>
	<path style="fill:#F29C1F;" d="M59,40H1c-0.552,0-1,0.448-1,1s0.448,1,1,1h58c0.552,0,1-0.448,1-1S59.552,40,59,40z"/>
	<path style="fill:#F29C1F;" d="M54,45H6c-0.552,0-1,0.448-1,1s0.448,1,1,1h48c0.552,0,1-0.448,1-1S54.552,45,54,45z"/>
	<path style="fill:#F29C1F;" d="M49,50H11c-0.552,0-1,0.448-1,1s0.448,1,1,1h38c0.552,0,1-0.448,1-1S49.552,50,49,50z"/>
	<path style="fill:#F29C1F;" d="M45,55H15c-0.552,0-1,0.448-1,1s0.448,1,1,1h30c0.552,0,1-0.448,1-1S45.552,55,45,55z"/>
</g>
<polygon style="fill:#546A79;" points="36.293,28.293 31,33.586 31,22 29,22 29,33.586 23.707,28.293 22.293,29.707 30,37.414   37.707,29.707 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
<span id="sunset">-</span> </p>


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




  function updateLayers() {
    return fetchData().then(d => {
      if (!d) return;
      const data = d;
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