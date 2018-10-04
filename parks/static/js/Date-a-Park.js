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
  
  d3.json('/activities').then(activities => {
    activities.forEach(option => {
      let div = d3.select('#activityOptions')
        .append('div')
        .attr('class', 'col-4 form-group');

      div.append('input')
        .attr('type','checkbox')
        .attr('class','form-control col-1')
        .attr('id',option[0]) .attr('name',option[0]);

      div.append('span')
        .text(() => {
          if (option.length > 20) {
            return option[0].slice(0, 20);
          } else {
            return option[0];
          }
        })
        .attr('class','text-white col-9')
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
        console.log(error);
    }
  });
}

function getParks(response) {
  // console.log('hi hi ... ', response);
  // var map = L.map('map').setView([39, -98], 3);
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //   maxZoom: 18,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // }).addTo(map);
  console.log("main map", NPMap.config.L);
  console.log("overlap = ", NPMap.config.overlays[0].L);
  var overlay = NPMap.config.overlays[0].L;
  map._layers = [];
}

function renderInitialMarkers() {
  var geojsonFeature = $.getJSON('/parks','',data => data);

  L.geoJSON(geojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
}

