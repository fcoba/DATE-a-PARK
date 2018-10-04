function initialize() {

  var options = {atmosphere: true, center: [42, -73], zoom: 0};
  var earth = new WE.map('earth_div', options);
  WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    attribution: 'NASA'
  }).addTo(earth);

  var yellowstone = WE.marker([44.423691,-110.588516]).addTo(earth);
  yellowstone.bindPopup('<img src="https://www.nps.gov/yell/planyourvisit/images/stats2013-17.png" style="width:170%;height: 170%;">');

  var redwoods = WE.marker([41.213181,-124.004631]).addTo(earth);
  redwoods.bindPopup('<iframe width="300" height="400" src="https://www.youtube.com/embed/C9LHjV48e9s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
  
  // Dynamically render the checkboxes - one box per activity
  d3.json('/activities').then(activities => {
    activities.forEach(option => {
      let div = d3.select('#activityOptions')
        .append('div')
        .attr('class', 'col-3 form-group');

      div.append('input')
        .attr('type','checkbox')
        .attr('class','form-control col')
        .attr('id',option[0]) .attr('name',option[0]);

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
        description: 'The alpha code is {{Code}}',
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
      removeAllMarkers(NPMap.config.L);
      throw new Error("Could not complete query. See Flask logs.", error);
    }
  });
}

function getParks(response) {
  var map = NPMap.config.L;
  removeAllMarkers(map, renderMarkers, response);
}

/**
 * Remove markers from the map (to reset it). Then, if given
 * a "cb" (callback function), execute that function!
 * 
 * @param {*} map 
 * @param {*} cb 
 * @param {*} data 
 */
function removeAllMarkers(map, cb, data) {
  map.eachLayer((layer) => {
    // remove existing markers
    if (!layer.hasOwnProperty('_url')) {
      map.removeLayer(layer);
    }
  });
  if (cb) {
    cb(data, map);
  }
}

/**
 * filterData = Array ... [name, lat, long]
 * @param {*} filterData 
 */
function renderMarkers(filterData, map) {
  var geojsonMarkerOptions = {
    radius: 8,
    iconUrl: '{{ url_for("static", filename="images/park_pin.png") }}',
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  filterData.forEach(val => {
    var coord = {
      lat: parseFloat(val[1], 10),
      lng: parseFloat(val[2], 10)
    };
    L.marker(coord, geojsonMarkerOptions).addTo(map);
  });
}
