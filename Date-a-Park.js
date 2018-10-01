

function initialize() {
    var options = {atmosphere: true, center: [42, -73], zoom: 0};
    var earth = new WE.map('earth_div', options);
    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
      minZoom: 0,
      maxZoom: 5,
      attribution: 'NASA'
    }).addTo(earth);
    var marker = WE.marker([44.423691,-110.588516]).addTo(earth);
    marker.bindPopup('<b>Hello world!</b>');
  }

  var NPMap = {
    div: 'map',
    overlays: [{
      filter: function (feature) {
        return feature.properties.park === 'Yellowstone';
      },
      popup: {
        title: '{{name}}'
      },
      styles: {
        point: {
          'marker-symbol': 'star'
        }
      },
      type: 'geojson',
      url: 'https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/gateway-points-of-interest.geojson'
    }, {
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
      url: 'https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson'
    }]
  };
  
  // (function () {
  //   var s = document.createElement('script');
  //   s.src = 'https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js';
  //   document.body.appendChild(s);
  // })();