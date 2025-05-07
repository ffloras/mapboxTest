
function setupSearch() {
  const script = document.getElementById('search-js');
  // wait for the Mapbox Search JS script to load before using it
  script.onload = function () {
    // select the MapboxSearchBox instance
    const mapboxAccessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';

    searchBar = new MapboxGeocoder();
    searchBar.accessToken = mapboxAccessToken;
    // set the options property
    // searchBar.options = {
    //   language: 'en',
    //   country: 'CA'
    // }

    document.getElementById('geocoding-container').appendChild(searchBar);

    // add an event listener to handle the `retrieve` event
    searchBar.addEventListener('retrieve', (e) => {
      const feature = e.detail;
      console.log(feature) // geojson object representing the selected item
    });
  }
}

setupSearch();


// const script = document.getElementById('search-js');
// // wait for the Mapbox Search JS script to load before using it
// let map;
// let searchBar;

// script.onload = function () {
//   const mapboxAccessToken = 'pk.eyJ1IjoiZmZsb3IiLCJhIjoiY21hN2prNHJ0MTZiZTJrb29jM3hodDRmdCJ9.VkVUw5Wb-oRpg7ngrzVXzQ';

//   // instantiate a map
//   map = new mapboxgl.Map({
//     accessToken: mapboxAccessToken,
//     container: 'map',
//     center: [-74.5, 40],
//     zoom: 9
//   });




//   searchBar = new MapboxGeocoder();
//   searchBar.accessToken = mapboxAccessToken;
//   searchBar.bindMap(map);


//   document.getElementById('geocoding-container').appendChild(searchBar);

//   searchBar.addEventListener('retrieve', (event) => {
//     const feature = event.detail;
//     console.log(feature);
//   });

// }

// function getLocation() {
//   document.getElementById('current').addEventListener("click", (e) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       map.flyTo({center: [position.coords.longitude, position.coords.latitude], zoom: 12});
//     });
    
//   })
// }

// getLocation();


