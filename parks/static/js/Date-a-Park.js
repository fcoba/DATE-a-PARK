var options = {atmosphere: true, center: [42, -73], zoom: 0};
var earth = new WE.map('earth_div', options);
var WEmarkers = [];
function initialize() {

  
  
  WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    attribution: 'NASA'
  }).addTo(earth);

  var yellowstone = WE.marker([44.423691,-110.588516]).addTo(earth);
  yellowstone.bindPopup('<img src="https://www.nps.gov/yell/planyourvisit/images/stats2013-17.png" style="width:170%;height: 170%;">');

  var redwoods = WE.marker([41.213181,-124.004631]).addTo(earth);
  redwoods.bindPopup('<iframe width="300" height="400" src="https://www.youtube.com/embed/C9LHjV48e9s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
  
  WEmarkers.push(yellowstone);
  WEmarkers.push(redwoods);

  // Dynamically render the checkboxes - one box per activity
  d3.json('/activities').then(activities => {
    activities.forEach(option => {
      let div = d3.select('#activityOptions')
        .append('div')
        .attr('class', 'col-3');

      div.append('input')
        .attr('type','checkbox')
        .attr('class','col')
        .attr('style','width: 15px')
        .attr('id',option[0])
        .attr('name',option[0]);

      div.append('span')
        .text(() => {
          if (option[0].length > 20) {
            return option[0].slice(0, 20) + "...";
          } else {
            return option[0];
          }
        })
        .attr('class','text-white col')
        .attr('for',option[0]);
    });
    
  });
}
  
var NPMap = {
  div: 'map',
  baseLayers: [
    'openstreetmap'
  ],
  overlays: [
    {
      popup: {
        // description: 'The alpha code is {{Code}}',
        title: '{{Name}}'
      },
      styles: {
        point: {
          'marker-color': '#609321',
          'marker-symbol': 'park'
        }
      },
      type: 'geojson',
      url: '/parks'
    }
  ]
};

function submit() {  
  var a = $.ajax({
    url: '/send',
    data: $('form').serialize(),
    type: 'GET',
    success: getParks,
    error: function(error) {
      removeAllMarkers(NPMap.config.L, earth);
      alert("Could not complete query. See Flask logs.");
      throw new Error("Could not complete query. See Flask logs.", error);
    }
  });
}

function getParks(response) {
  var map = NPMap.config.L;
  removeAllMarkers(map, earth, renderMarkers, response);
}

/**
 * Remove markers from the map (to reset it). Then, if given
 * a "cb" (callback function), execute that function!
 * 
 * @param {*} map 
 * @param {*} cb 
 * @param {*} data 
 */
function removeAllMarkers(map, earth, cb, data) {
  map.eachLayer((layer) => {
    // remove existing markers
    if (!layer.hasOwnProperty('_url')) {
      map.removeLayer(layer);
    }
  });
  WEmarkers.forEach(marker => {
    marker.removeFrom(earth);
  });
  WEmarkers = WEmarkers.slice(0,0);

  if (cb) {
    cb(data, map, earth);
  }
}


/**
 * filterData = Array ... 
 * [
 *  ...
 *  [name, lat, long],
 *  ...
 * ]
 * @param {*} filterData 
 */
function renderMarkers(filterData, map, earth) {
  var geojsonMarkerOptions = {
    radius: 8,
    iconUrl: '/static/images/park_pin.png',
    fillColor: "#609321",
    color: "#609321",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  var treeIcon = L.icon({
    iconUrl: '/static/images/park_pin.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

    // shadowUrl: 'leaf-shadow.png',
  });
  filterData.forEach(val => {
    var coord = {
      lat: parseFloat(val[1], 10),
      lng: parseFloat(val[2], 10)
    };
    var marker = L.marker(coord, {icon: treeIcon}).addTo(map);
    marker.bindPopup(val[0]);
    var mark = WE.marker(coord, '/static/images/park_pin.png').addTo(earth);
    mark.bindPopup(val[0]);
  
    WEmarkers.push(mark);
  });
}
