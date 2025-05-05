let userLocation = [2.3, 48.8]

function setupMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: userLocation, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}

function setupSearch() {
  const script = document.getElementById('search-js');
  // wait for the Mapbox Search JS script to load before using it
  script.onload = function () {
    // select the MapboxSearchBox instance
    const searchBox = document.querySelector('mapbox-search-box')

    // set the options property
    searchBox.options = {
      language: 'es',
      country: 'MX'
    }

    // add an event listener to handle the `retrieve` event
    searchBox.addEventListener('retrieve', (e) => {
      const feature = e.detail;
      console.log(feature) // geojson object representing the selected item
    });
  }
}


const script = document.getElementById('search-js');
// wait for the Mapbox Search JS script to load before using it
script.onload = function () {
  const mapboxAccessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';

  // instantiate a map
  const map = new mapboxgl.Map({
    accessToken: mapboxAccessToken,
    container: 'map',
    center: [-74.5, 40],
    zoom: 9
  });




  // instantiate a search box instance
  const searchBox = new mapboxsearch.MapboxSearchBox()

  // set the mapbox access token, search box API options
  searchBox.accessToken = mapboxAccessToken
  searchBox.options = {
    language: 'es'
  }

  searchBox.addEventListener('retrieve', (e) => {
    const feature = e.detail;
    console.log(feature) // geojson object representing the selected item
  });

  // set the mapboxgl library to use for markers and enable the marker functionality
  searchBox.mapboxgl = mapboxgl
  searchBox.marker = true



  // bind the search box instance to the map instance
  searchBox.bindMap(map)

  // add the search box instance to the DOM
  document.getElementById('search-box-container').appendChild(searchBox)


}


//setupSearch();
//setupMap();