class Map {
  map: google.maps.Map;
  constructor() {
    console.log("Map Loaded")
    this.init()
    // this.listen('click');
  }

  init(): google.maps.Map {
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: { lat: 40.90791, lng: 29.17695 },
      gestureHandling: 'greedy',
      keyboardShortcuts : true
      // zoomControlOptions : {
      //   style : 
      // }
    });
    // map.data.loadGeoJson(
    //   "https://storage.googleapis.com/mapsdevsite/json/google.json"
    // );
    this.map = map;
    return this.map
  }

  zoom(position : google.maps.LatLng, zoomLevel : number = 15){
    // this.map.setZoom(10);
    this.map.setZoom(zoomLevel);
    this.map.setCenter(position);
  }

  listen(eventName: string, listener) {
    return new Promise((resolve) => {
      this.map.addListener(eventName, listener);
    })
    
  }

  // mapClickHandler(e) {
  //   console.log("mapClickHandler")
  //   this.MarkerObject.closeInfoWindow();
  //   this.MarkerObject.setAllMarkersDefault();
  // }
}

export default Map;
