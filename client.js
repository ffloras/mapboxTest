// let userLocation = [2.3, 48.8]



// function setupMap() {
//   mapboxgl.accessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';
//   const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: userLocation, // starting position [lng, lat]
//     zoom: 9, // starting zoom
//   });
// }

// function setupSearch() {
//   const script = document.getElementById('search-js');
//   // wait for the Mapbox Search JS script to load before using it
//   script.onload = function () {
//     // select the MapboxSearchBox instance
//     const searchBox = document.querySelector('mapbox-search-box')

//     // set the options property
//     searchBox.options = {
//       language: 'es',
//       country: 'MX'
//     }

//     // add an event listener to handle the `retrieve` event
//     searchBox.addEventListener('retrieve', (e) => {
//       const feature = e.detail;
//       console.log(feature) // geojson object representing the selected item
//     });
//   }
// }

let map;
let searchBox;
let currentSearch = null;

const script = document.getElementById('search-js');
// wait for the Mapbox Search JS script to load before using it
script.onload = function () {
  const mapboxAccessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';

  // instantiate a map
  map = new mapboxgl.Map({
    accessToken: mapboxAccessToken,
    container: 'map',
    center: [-74.5, 40],
    zoom: 9
  });


  map.on('load', () => {
    map.addSource('wms-test-source', {
      'type': 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      'tiles': [
        'https://geo.weather.gc.ca/geomet?&service=WMS&request=GetMap&layers=GDPS.ETA_T8.6h&styles=&format=image%2Fjpeg&transparent=false&version=1.3.0&width=256&height=256&crs=EPSG%3A3857&bbox={bbox-epsg-3857}'
      ],
      'tileSize': 256
    });
    map.addLayer(
      {
        'id': 'geomet',
        'type': 'raster',
        'source': 'wms-test-source',
        'paint': {}
      },
    );
    map.setPaintProperty('geomet', 'raster-opacity', 0.5);
  });


  // instantiate a search box instance
  //searchBox = new mapboxsearch.MapboxSearchBox()
  searchBox = new MapboxGeocoder();

  // set the mapbox access token, search box API options
  searchBox.accessToken = mapboxAccessToken
  // searchBox.options = {
  //   language: 'es'
  // }

  searchBox.addEventListener('retrieve', (e) => {
    const feature = e.detail;
    currentSearch = feature; // geojson object representing the selected item
    console.log(currentSearch);
  });

  // set the mapboxgl library to use for markers and enable the marker functionality
  searchBox.mapboxgl = mapboxgl
  searchBox.marker = true



  // bind the search box instance to the map instance
  searchBox.bindMap(map)

  // add the search box instance to the DOM
  document.getElementById('search-box-container').appendChild(searchBox)

  const imageUrl = 'https://geo.weather.gc.ca/geomet?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GDPS.ETA_T8.6h&format=image/png';

  document.getElementById("legend").src = imageUrl;

},

  function getLocation() {
    document.getElementById('current').addEventListener("click", (e) => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.longitude, position.coords.latitude)
        map.flyTo({ center: [position.coords.longitude, position.coords.latitude], zoom: 12 });
      });

    })
  }
getAlerts()
async function getAlerts() {
  document.getElementById("alert").addEventListener("click", async (e) => {
    let coorArray = currentSearch.geometry.coordinates;
    let coor = {
      long: coorArray[0],
      lat: coorArray[1]
    }
    try {
      console.log("coor " + coor.lat + " " + coor.long)
      let response = await fetch("/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(coor)
      })
      let html = await response.text()
      document.getElementById("alert-content").innerHTML = html;
    } catch (error) {
      console.log(error);
    }
    
  })
}

document.getElementById("ai-tip-button").addEventListener("click", (e) => {
  getAdaptationTip();
})


function getAdaptationTip() {
  let coorArray = currentSearch.geometry.coordinates;
    let coor = {
      long: coorArray[0],
      lat: coorArray[1]
    }
  fetch("/getAdaptationTip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(coor)
      })
  .then( async (response) => {
    let html = await response.text();
    document.getElementById("tip-content").innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
  })
}
//getLocation();


//setupSearch();
//setupMap();

//total precipitation index
//GDPS-WEonG_15km_TotalPrecipIntensityIndex.3h

//temp? -20 to 20degC
//GDPS.CONV_ML-PRC-TMP.3h

// const eventSource = new EventSource('/alertsLog');
// eventSource.onmessage = (event) => {
//     let alerts = JSON.parse(event.data);
//     console.log("Received New Alert (client):", JSON.parse(event.data));
// };