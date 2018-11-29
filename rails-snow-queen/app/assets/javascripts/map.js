class Map {
	constructor(config) {
    this.map = this.initMap();
    this.drawingManager = this.initDrawingManager();
    this.removeControl = this.initRemoveControl();
    this.geocoder = this.initGeocoder();
    this.marker = null;
    this.geocodedAddress = null;
    this.polygons = [];
    this.onGeocodingResponse = config.onGeocodingResponse;

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleGeocodingResponse = this.handleGeocodingResponse.bind(this);
    this.handleRemovePolygon = this.handleRemovePolygon.bind(this);
    this.handlePolygonCreated = this.handlePolygonCreated.bind(this);
    this.addListeners()
  }
  
  initMap() {
    return new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 49.2860, lng: -122.8130},
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      tilt:0
    });
  }
  
  initDrawingManager() {
    const drawingOptions = {
      fillColor: '#2DC1D6',
      fillOpacity: 0.3,
      strokeWeight: 5,
      strokeColor: '#2DC1D6',
      clickable: false,
      editable: true,
      zIndex: 1
    }
    return new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon', 'rectangle']
      },
      map: this.map,
      // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
      // markerOptions: {icon: 'snow_flake.png'},
      polygonOptions: drawingOptions,
      rectangleOptions: drawingOptions
    })
  }
  
  initRemoveControl() {
    const removeControlDiv = document.createElement('div');
    removeControlDiv.classList.add("map-btn")
    removeControlDiv.title = 'Click to remove selected area from the map';
    removeControlDiv.innerHTML = 'Remove last';

    removeControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(removeControlDiv);

    return removeControlDiv;
  }

  initGeocoder() {
    return new google.maps.Geocoder();
  }

  addListeners() {
    document.getElementById('AddressSearch').addEventListener('submit', this.handleSearchSubmit);
    this.removeControl.addEventListener('click', this.handleRemovePolygon);
    this.drawingManager.addListener('polygoncomplete', this.handlePolygonCreated)
  }
  
  handleSearchSubmit(event) {
    event.preventDefault();
    if (this.marker) { this.marker.setMap(null) }
    this.geocodeAddress();
  }

  geocodeAddress() {
    let address = document.getElementById('address').value;
    this.geocoder.geocode({'address': address, 'region': "CA"}, this.handleGeocodingResponse);
  }

  handleGeocodingResponse(results, status) {
    if (status === 'OK') {
      this.map.panTo(results[0].geometry.location);
      this.map.setZoom(20);
      this.marker = new google.maps.Marker({
        map: this.map,
        position: results[0].geometry.location
      });
      this.geocodedAddress = results[0].formatted_address;
      this.onGeocodingResponse(this.geocodedAddress);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  }

  handleRemovePolygon() {
    this.polygons.pop().setMap(null);

    // this.polygons.setMap(null);
  }

  handlePolygonCreated(polygon){
    this.polygons.push(polygon);
    console.log(this.polygons)
  }
}
