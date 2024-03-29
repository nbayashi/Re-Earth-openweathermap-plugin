
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
<div style="width: 90%; padding:20px;">
<canvas id="canvas"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://unpkg.com/moment@2.22.1/moment.js"></script>
<script src="https://unpkg.com/chart.js@2.7.2/dist/Chart.bundle.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js"></script>
<script id="chartjs" src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-zoom/0.7.7/chartjs-plugin-zoom.js"></script>



<script>
  let property, forecastcart;



  const config={
    type: 'bar',
    data: {
      labels: [], // Date Objects
      datasets: [{
        label:'temp(℃)',
        backgroundColor: 'rgb(200, 100, 0)',
        borderColor: 'rgb(200, 100, 0)',
        yAxisID: 'y1',
          data: [],
          fill: false,
          type: 'line',
          order: 1
        },{
        label:'pressure(hPa)',
        backgroundColor: 'rgb(100, 100, 100)',
        borderColor: 'rgb(100, 100, 100)',
        yAxisID: 'y2',
        data:[],
          fill: false,
          type: 'line',
          order: 2
        },{
          label: 'rain/snow(mm)',
          data: [],
          borderColor: 'rgb(0, 139, 232)',
          backgroundColor: 'rgb(0, 139, 232)',
              yAxisID: 'y3',
          order: 3
        }
      ]},
      options: {
        title: {
          display: true,
          text: "Forecast"
        },
        scales: {
          xAxes: [{
            position: 'top',
            type: 'time',
            time: {
              min: (0),
              max: (0),
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
  



  function fetchData(){
    // if (!property) return Promise.resolve();
    const query_params = new URLSearchParams({
      id: property.cityId,
      appid: property.apiKey,
      units: "metric"});
    return fetch("https://api.openweathermap.org/data/2.5/forecast?" + query_params
    ).then(r => {
          if (r.ok) return r.json();
        }).then(r => {
          if (!r) return;
          weatherData = r; 
          return weatherData;
        });
      }


  

  function updateLayers(forecastcart) {
    return fetchData().then(d => {
      if (!d) return;
      const apiData = d;
      const weather = getForecastValue(apiData);
      updateChart(weather,forecastcart)
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





  function updateChart(forecastObj,forecastcart){
    // set icon
    let iconArr = Array.from(new Set(forecastObj.forecast[5]));
    let iconb ={};
    for (let i = 0; i < iconArr.length; i++) {
      iconb[iconArr[i]] = new Image();
      iconb[iconArr[i]].src = 'http://openweathermap.org/img/wn/' + iconArr[i] +'@2x.png';
      iconb[iconArr[i]].width = 40;
      iconb[iconArr[i]].height = 40;
    }
    Chart.pluginService.register({
      afterUpdate: function(chart) {
        for (let i = 0; i < forecastObj.forecast[5].length; i++) {
        chart.config.data.datasets[3]._meta[0].data[i]._model.pointStyle = iconb[forecastObj.forecast[5][i]];
        }
      }
    });

    const chartdata = {
      labels:forecastObj.forecast[0],
      datasets:[{
        label:'temp(℃)',
        borderWidth:0,
        backgroundColor: 'rgba(200, 100, 0, 0.8)',
        borderColor: 'rgba(200, 100, 0, 0.8)',
        yAxisID: 'y1',
        data:forecastObj.forecast[1],
        fill: false,
        type: 'line',
        order: 1
      },{
        label:'pressure(hPa)',
        borderWidth:0,
        backgroundColor: 'rgba(100, 100, 100, 0.8)',
        borderColor: 'rgba(100, 100, 100, 0.8)',
        yAxisID: 'y2',
        data:forecastObj.forecast[4],
        fill: false,
        type: 'line',
        order: 2
      },{
        label:'rain/snow(mm)',
        borderWidth:0,
        backgroundColor: 'rgba(0, 100, 200,0.8)',
        borderColor: 'rgba(0, 100, 200,0.8)',
        yAxisID: 'y3',
        data:forecastObj.forecast[7],
        fill: false,
        type: 'bar',
        order: 3
      },{
        label: '',
        type: 'line',
        borderWidth:0,
        borderColor: 'rgba(0, 0,0,0)',
        backgroundColor: 'rgba(0, 0, 0,0)',
        radius:2,
        data: [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9],
            yAxisID: 'y4',
        order: 4
      }]
    };
    const chartoption = {
      title: {
        display: true,
        text: "Forecast"
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
        },{
          id: "y4",   // Y軸のID
          type: "linear",   // linear固定 
          position: "left", // どちら側に表示される軸か？
          display:false,
          ticks: {          // スケール
            max: 1,
            min: 0,
            stepSize: 1
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



  const ctx = document.getElementById("canvas").getContext("2d");
  forecastcart =new Chart(ctx, config);
  canvas.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

  updateLayers(forecastcart);


  updateLayers(forecastcart);
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