// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  // center: [40.7128, -74.0060],
  zoom: 6
});
// var myMap = L.map("map", {
//   center: [40.7128, -74.0060],
//   zoom: 6
// });

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "YottaBytes | Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 24,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

/* data route */
var url = "/data";

// d3.json(url).then(function(response) {
//   console.log(response)
// });

// d3.json(url).then(function(response) {
//   console.log(response);

//   var bigfootMarker = [];
//   for (var i = 0; i < response.length; i++) {
//     var latitude = response[i].lat;
//     var longitude = response[i].lng;
//     var marker = L.marker([latitude[1], longitude[1]])
//     bigfootMarker.push(marker);
//   }
// });

d3.json(url, function(response) {
  console.log(response)
})

//   for (var i = 0; i < response.length; i++) {
//     marker = new L.marker([response[i][1],response[i][2]])
//       .bindPopup(response[i][0])
//       .addTo(map);
//   }
// });

// d3.json(url).then(function(response) {
//   console.log(response);

//   for (var i = 0; i < url.length; i++) {
//     marker = new L.marker([url[i][1],url[i][2]])
//       .bindPopup(url[i][0])
//       .addTo(map);
//   }
// });

// var bigfootMarkers = [];
// for (var i = 0; i < url.length; i++) {
//   // loop through the url array, create a new marker, push it to the bigfootMarkers array
//   var marker = L.marker(url[i].location).bindPopup("<h1>" + cities[i].name + "</h1>");
//   cityMarkers.push(marker);
// }

// RANDOM OLD NOTES - IGNORE!
// for (var i = 0; i < url.length; i++) {

//   // Conditionals for points
//   var color = "";
//   if (url[i].year = "2009") {
//     color = "yellow";
//   }
//   else if (url[i].year = "2011") {
//     color = "blue";
//   }
//   else if (url[i].year = "2012") {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }

//   // Add circles to map
//   // L.addMarkers()
//   // L.bindPopup("<h1>" + url[i].year + "</h1> <hr> <h3>Activities: " + url[i].year + "</h3>").addTo(myMap);
// }
// });

  // Add circles to map
  // L.circle(url[i].location, {
  //   fillOpacity: 0.75,
  //   color: "white",
  //   fillColor: color,
  //   radius: 15000})