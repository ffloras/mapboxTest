const script = document.getElementById('search-js');
// wait for the Mapbox Search JS script to load before using it
let map;
let searchBar;

script.onload = function () {
  const mapboxAccessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';

  // instantiate a map
  map = new mapboxgl.Map({
    accessToken: mapboxAccessToken,
    container: 'map',
    center: [-74.5, 40],
    zoom: 9
  });




  searchBar = new MapboxGeocoder();
  searchBar.accessToken = mapboxAccessToken;
  searchBar.bindMap(map);


  document.getElementById('geocoding-container').appendChild(searchBar);

  searchBar.addEventListener('retrieve', (event) => {
    const feature = event.detail;
    console.log(feature);
  });

}



