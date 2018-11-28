// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .

let marker = null;

function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 49.2860, lng: -122.8130},
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    tilt:0
  });

  const drawingOptions = {
    fillColor: '#2DC1D6',
    fillOpacity: .3,
    strokeWeight: 5,
    strokeColor: '#2DC1D6',
    clickable: false,
    editable: true,
    zIndex: 1
  }
  let drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon', 'rectangle']
    },
    // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    // markerOptions: {icon: 'snow_flake.png'},
    polygonOptions: drawingOptions,
    rectangleOptions: drawingOptions
  });

  drawingManager.setMap(map);

  let geocoder = new google.maps.Geocoder();

  document.getElementById('AddressSearch').addEventListener('submit', function(event) {
    event.preventDefault();
    if (marker) { marker.setMap(null) }
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  let address = document.getElementById('address').value;
  geocoder.geocode({'address': address, 'region': "CA"}, function(results, status) {
    if (status === 'OK') {
      resultsMap.panTo(results[0].geometry.location);
      resultsMap.setZoom(20);
      marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      console.log("===========================================")
      console.log(address)
      console.log("===========================================")
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}