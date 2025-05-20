// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const provider = new GeoSearch.OpenStreetMapProvider();
const search = new GeoSearch.GeoSearchControl({
  provider: provider,
  style: 'bar'
});

map.addControl(search); // Add the search control to the map

let wmsLayer = L.tileLayer.wms('https://geo.weather.gc.ca/geomet?', {
  layers: 'GDPS.ETA_RN',
  version: '1.3.0',
  opacity: 0.5,
}).addTo(map);

// Add the image as a custom control in the bottom-right corner
const imageUrl = 'https://geo.weather.gc.ca/geomet?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GDPS.ETA_RN&format=image/png';

const imageControl = L.control({ position: 'bottomright' });

imageControl.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend-image');
  div.innerHTML = `<img src="${imageUrl}" alt="Legend" style="width: 150px; height: auto; border: 1px solid black;">`;
  return div;
};

imageControl.addTo(map);

