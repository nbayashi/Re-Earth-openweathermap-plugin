
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
  font-size:40px
}

</style>
<p class="env-info">データ取得時刻</p>
<p class="env-info"><span id="data-fetch-time">-</span> </p>
<p class="env-info">Weather: <span id="weather">-</span></p>
<div style="width: 90%; padding:20px;">
<canvas id="canvas"></canvas>
</div>

<script src="https://unpkg.com/moment@2.22.1/moment.js"></script>
<script src="https://unpkg.com/chart.js@2.7.2/dist/Chart.bundle.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js"></script>
<script id="chartjs" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/0.6.3/chartjs-plugin-zoom.js"></script>

<script>
  let property;
  function fetchData(){
    // if (!property) return Promise.resolve();
    const query_params = new URLSearchParams({
      // id:1853908,
      // appid:"eab978b11202cc3c9daa14445bb3648f",
      id:property.cityId,
      appid:property.apiKey,
      units:"metric"});
    return fetch("https://api.openweathermap.org/data/2.5/forecast?" + query_params
    ).then(r => {
          if (r.ok) return r.json();
        }).then(r => {
          if (!r) return;
          weatherData = r; 
          console.log(weatherData); 
          return weatherData;
        });
      }


  
//   const query_params = new URLSearchParams({
//     id:1853908,
//     appid:"eab978b11202cc3c9daa14445bb3648f",
//     // id:property.cityId,
//     // appid:property.apiKey,
//     units:"metric"});

//   fetch("https://api.openweathermap.org/data/2.5/forecast?" + query_params)
// .then(response => {
//     return response.json()
// })
// .then(data => {
//     var fetchedData = data;
//     console.log(data);
//     console.log(data.list);
// })

// let weathera = getForecastValue(fetchedData);


  function updateLayers() {
    return fetchData().then(d => {
      if (!d) return;
      const apiData = d;
      console.log(apiData);
      const weather = getForecastValue(apiData);
      console.log(weather);
      updateChart(weather)
      });
    return;
  }

  function getForecastValue(data) {
    var timestamp =[];
    var temps =[];
    var temps_max =[];
    var temps_min =[];
    var pressure =[];
    var weatherIcon =[];
    var pop =[];
    var rain =[];
    for(let i = 0; i < 24; i++){
      timestamp.push(data.list[i].dt*1000);
      temps.push(data.list[i].main.temp);
      temps_max.push(data.list[i].main.temp_max);
      temps_min.push(data.list[i].main.temp_min);
      pressure.push(data.list[i].main.pressure);
      weatherIcon.push(data.list[i].weather[0].icon);
      pop.push(data.list[i].pop);
      if(data.list[i].hasOwnProperty('rain')){
        rain.push(data.list[i].rain["3h"]);
      }else if(data.list[i].hasOwnProperty('snow')){
        rain.push(data.list[i].snow["3h"]);
      }else{
        rain.push(0);
      }
    }
    return {
        forecast:[
        timestamp,
        temps,
        temps_max,
        temps_min,
        pressure,
        weatherIcon,
        pop,
        rain]
      };
  }



const config={
  type: 'bar',
  data: {
    labels: [1642960800000, 1642971600000, 1642982400000, 1642993200000, 1643004000000, 1643014800000, 1643025600000, 1643036400000, 1643047200000, 1643058000000, 1643068800000, 1643079600000, 1643090400000, 1643101200000, 1643112000000, 1643122800000, 1643133600000, 1643144400000, 1643155200000, 1643166000000, 1643176800000, 1643187600000, 1643198400000, 1643209200000], // Date Objects
    datasets: [{
      label:'temp(℃)',
      backgroundColor: 'rgb(200, 100, 0)',
      borderColor: 'rgb(200, 100, 0)',
      yAxisID: 'y1',
        data: [-0.69, -1.84, -0.06, 2.04, 2.12, -5.87, -9.62, -11.7, -12.41, -12.23, -1.23, 4.33, 3.7, 0.65, -0.55, -2.42, -2.92, -4.46, 1.36, 3.96, 4.15, 1.37, -0.37, -5.79],
        fill: false,
        type: 'line',
        order: 1
      },{
      label:'pressure(hPa)',
      backgroundColor: 'rgb(100, 100, 100)',
      borderColor: 'rgb(100, 100, 100)',
      yAxisID: 'y2',
      data:[1034, 1034, 1032, 1027, 1025, 1029, 1031, 1031, 1029, 1026, 1024, 1021, 1020, 1022, 1023, 1023, 1022, 1022, 1021, 1019, 1018, 1023, 1025, 1024],
        fill: false,
        type: 'line',
        order: 2
      },{
        label: 'rain(mm)',
        data: [10, 10, 10, 1, 5, 19, 31, 1, 29, 26, 24, 21, 20, 22, 23, 23, 22, 22, 21, 9, 18, 23, 25, 24],
        borderColor: 'rgb(0, 139, 232)',
        backgroundColor: 'rgb(0, 139, 232)',
            yAxisID: 'y3',
        order: 3
      }
    ]},
    options: {
      title: {
        display: true,
        text: "Temperature and Pressure"
      },
      scales: {
        xAxes: [{
          position: 'top',
          type: 'time',
          time: {
            min: (1642960800000),
            max: (1643036400000),
            minUnit: 'hour',
            tooltipFormat: 'l h:mm a',
            stepSize: 6,
            displayFormats: {
              hour: 'MMM D H:mm'
            },
            ticks: { source: 'data' }
          },
        }],
        yAxes: [{
          id: "y1",   // Y軸のID
          type: "linear",   // linear固定 
          position: "left", // どちら側に表示される軸か？
          ticks: {          // スケール
            max: 10,
            min: -20,
            stepSize: 5,
            fontColor:'rgb(200, 100, 0)'
          },
          },{
          id: "y2",
          type: "linear", 
          position: "right",
          ticks: {
            max: 1040,
            min: 1010,
            stepSize: 5,
            fontColor:'rgb(100, 100, 100)'
          },
        },{
          id: "y3",   // Y軸のID
          type: "linear",   // linear固定 
          position: "left", // どちら側に表示される軸か？
          ticks: {          // スケール
            max: 50,
            min: 0,
            stepSize: 10,
            fontColor:'rgb(0, 100, 200)'
          },
          }]
      },
      pan: {
        enabled: true,
        mode: "x"
      },
      zoom: {
        enabled: true,
        drag: false,
        mode: ""
      }
    }
};

document.getElementById("chartjs").addEventListener("load", () => {
  const ctx = document.getElementById("canvas").getContext("2d");
  forecastcart =new Chart(ctx, config);
  canvas.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
});

  function updateChart(forecastObj){
    const chartdata = {
      labels:forecastObj.forecast[0],
      datasets:[{
        label:'temp(℃)',
        backgroundColor: 'rgb(200, 100, 0)',
        borderColor: 'rgb(200, 100, 0)',
        yAxisID: 'y1',
        data:forecastObj.forecast[1],
        fill: false,
        type: 'line',
        order: 1
      },{
        label:'pressure(hPa)',
        backgroundColor: 'rgb(100, 100, 100)',
        borderColor: 'rgb(100, 100, 100)',
        yAxisID: 'y2',
        data:forecastObj.forecast[4],
        fill: false,
        type: 'line',
        order: 2
      },{
        label:'rain(mm)',
        backgroundColor: 'rgb(0, 100, 200)',
        borderColor: 'rgb(0, 100, 200)',
        yAxisID: 'y3',
        data:forecastObj.forecast[7],
        fill: false,
        type: 'bar',
        order: 3
      }]
    };
    const chartoption = {
      title: {
        display: true,
        text: "Temperature and Pressure"
      },
      scales: {
        xAxes: [{
          position: 'top',
          type: 'time',
          time: {
            min: (forecastObj.forecast[0][0]),
            max: (forecastObj.forecast[0][4]),
            minUnit: 'hour',
            tooltipFormat: 'l h:mm a',
            stepSize: 6,
            displayFormats: {
              hour: 'MMM D H:mm'
            },
            ticks: { source: 'data' }
          },
        }],
        yAxes: [{
          id: "y1",   // Y軸のID
          type: "linear",   // linear固定 
          position: "left", // どちら側に表示される軸か？
          ticks: {          // スケール
            max:(Math.ceil(Math.max(...forecastObj.forecast[1])/5)*5),
            min:(Math.floor(Math.min(...forecastObj.forecast[1])/5)*5),
            stepSize: 5,
            fontColor:'rgb(200, 100, 0)'
            },
        },{
          id: "y2",
          type: "linear", 
          position: "right",
          ticks: {
            max:(Math.ceil(Math.max(...forecastObj.forecast[4])/5)*5),
            min:(Math.floor(Math.min(...forecastObj.forecast[4])/5)*5),
            stepSize: 5,
            fontColor:'rgb(100, 100, 100)'
          },
        },{
          id: "y3",
          type: "linear", 
          position: "left",
          ticks: {
            max:(Math.ceil(Math.max(...forecastObj.forecast[7])/5)*5),
            min:(0),
            stepSize: 5,
            fontColor:'rgb(0, 100, 200)'
          },
        }]
      },
      pan: {
        enabled: true,
        mode: "x"
      },
      zoom: {
        enabled: true,
        drag: false,
        mode: ""
      }
    };
    forecastcart.data = chartdata;
    forecastcart.options = chartoption;
    forecastcart.update();
  }


window.addEventListener("message", e => {
  if (e.source !== parent) return;
  property = e.data;
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
    reearth.ui.postMessage(reearth.block.property.default);
  }
}