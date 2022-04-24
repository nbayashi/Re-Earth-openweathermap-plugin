
const html = `
<h1 id="text"></h1>
<style>
  html, body {
    margin: 0;
    background: transparent;
  }
</style>
<script>

  let property, layers, source;

  function fetchData(cityId){
    // if (!property) return Promise.resolve();
    const query_params = new URLSearchParams({
      id:cityId,
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


    

    
  
  function overrideProperty() {

    const weatherLayers = source.reearth.layers.findByTagLabels("weather");
    const childLayers = weatherLayers.flatMap(ch => (ch.children || [ch]));

  
    // Change symbol
    for (let lyr = 0; lyr < childLayers.length; lyr++) {
      // get areaID
      let cityID = childLayers[lyr].infobox.blocks.find((v) => v.extensionId === "currenticonblock").property.default.cityId;
      // fetch API
      fetchData(cityID).then(d => {
        if (!d) return
        var apiData = d;
        var weathericon = apiData.weather[0].icon;
        setIcon(weathericon,childLayers[lyr]);
      });
    }
  }
  
  // set Icon
  function setIcon(icon, targetlyr) {
    source.reearth.layers.overrideProperty(targetlyr.id, {
      default: { 
        style: "image",
        image: "https://openweathermap.org/img/wn/" + icon + "@2x.png"}
    }) 
  }
  

  window.addEventListener("message", e => {
    if (e.source !== parent) return;
    source = e.source;
    property = e.data.property;
    layers = e.source.reearth.layers.layers;
    overrideProperty();
  });



</script>
`;




reearth.ui.show(html);
reearth.on("update", send);
send();


function send() {
  if (reearth.widget?.property?.default) {
    reearth.ui.postMessage({
      property: reearth.widget.property.default,
      layers: reearth.layers.layers
    });
  }
}
