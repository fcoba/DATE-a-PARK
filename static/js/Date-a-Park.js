

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
        .attr('class', 'col-4');

      div.append('input')
        .attr('type','checkbox')
        .attr('class','col-1');

      div.append('span')
        .text(() => {
          if (option.length > 20) {
            return option[0].slice(0, 20);
          } else {
            return option[0];
          }
        })
        .attr('class','text-white col-10');
    });
    
  });
}

  
var NPMap = {
  div: 'map',
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
      url: 'https://www.nps.gov/lib/npmap.js/4.0.0/examples/data/national-parks.geojson'
    }
  ]
};


function submitActivities() {
  console.log("HIIII");
}