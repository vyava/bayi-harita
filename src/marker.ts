import InfoWindowObject from "./window";
import List from "./list";

class Marker {
  public marker: google.maps.Marker;
  public markers: [google.maps.Marker] = <any>[];
  public map: google.maps.Map = null;
  public lastWindow: google.maps.InfoWindow;
  public InfoWindow;
  public ListObject;
  private DEFAULT_OPACITY = 0.9;
  private PASSIVE_OPACITY = 0.5;

  markerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    // fillColor: '#000',
    // fillOpacity: .9,
    // scale: 10,
    // strokeColor: '#000',
    // strokeWeight: 1
  };
  constructor() {
    this.InfoWindow = new InfoWindowObject();
    this.lastWindow = this.InfoWindow.lastWindow;
    this.ListObject = new List();
  }

  public create({ map, position, unvan, ruhsatNo }) {
    // Create a marker
    let marker = new google.maps.Marker({
      icon : this.markerIcon,
      map,
      position,
      title: unvan,
      animation: google.maps.Animation.DROP,
      opacity: this.DEFAULT_OPACITY
      // optimized : false
    });
    marker.setValues({
      ruhsatNo: ruhsatNo.trim()
    });
    if (!this.map) {
      this.map = map;
    }
    let that = this;

    marker.addListener("mouseover", function() {
      this.setZIndex(100);
      this.setOpacity(1);
    });

    marker.addListener("mouseout", function() {
      // this.setZIndex(100);
      this.setOpacity(0.9);
    });

    // Set click handler to the Marker
    marker.addListener("click", function(e) {
      that.markerClickHandler(this)
    });

    this.markers.push(marker);
  }

  markerClickHandler(marker) {
    // Remove active list element
    let bayiData = this.ListObject.selectBayiFromList(marker.ruhsatNo)
    // Close last InfoWindow
    this.closeInfoWindow();

    // Create new InfoWindow for clicked marker
    this.InfoWindow.setInfoWindow(bayiData, marker.getPosition());

    // Listen for InfoWindow change event
    this.InfoWindow.listen(this.setAllMarkersDefault);
    // Open the InfoWindow for clicked marker
    this.lastWindow.open(this.map, marker);
    // Set 0 to all markers
    this.setAllMarkersPassive();
    // Set high index to the marker
    marker.setZIndex(100);
    marker.setOpacity(this.DEFAULT_OPACITY);
  }

  closeInfoWindow() {
    if (this.lastWindow) this.lastWindow.close();
  }

  findMarker(markerId : string){
    return this.markers.find((_marker : any) => _marker.ruhsatNo == markerId)
  }

  clickOutsideOfMarker() {
    this.closeInfoWindow();
    this.ListObject.removeActiveElementFromList()
    this.setAllMarkersDefault();
  }

  setAllMarkersPassive() {
    this.markers.map(_m => {
      _m.setZIndex(100);
      _m.setOpacity(this.PASSIVE_OPACITY);
    });
  }

  setAllMarkersDefault() {
    this.markers.map(_m => {
      _m.setOpacity(this.DEFAULT_OPACITY);
    });
  }
}

export default Marker;
