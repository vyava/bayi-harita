import Map from "./map";
import Marker from "./marker";
import List from "./list";
import {Iterate, Utils} from "./utils";
// declare var google;
// declare var MarkerClusterer;

var map: google.maps.Map;

window.addEventListener("load", async () => {
  // Instance of Map
  const MapObject = new Map();
  map = MapObject.init();

  // Instance of Marker
  const MarkerObject = new Marker();

  // Instance of List
  const ListObject = new List();

  // Instance of Utils and Iterate
  const UtilsObject = new Utils();
  
  // Click handler for `map` element
  MapObject.listen('click', function(){
    MarkerObject.clickOutsideOfMarker();
  });

  // Add click handler to the list elements
  ListObject.addClickHandlerList((id) => {
    let ruhsatNo = id;

    let marker = MarkerObject.findMarker(ruhsatNo);
    MapObject.zoom(marker.getPosition(), 16);
    MarkerObject.markerClickHandler(marker);
  });
  // Get elementlist
  let elementList : [HTMLElement] = ListObject.getElementList();
  
  // Get headerlist
  ListObject.getHeaderList();
  ListObject.setHeaderDisable();
  // Add click handler to the header elements
  // ListObject.addClickHandlerHeader((id) => {
  //   let durum = id;
  //   console.log(durum);
  // });
  

  let bayiler = UtilsObject.parseBayiler(elementList);

  // Iterate for Coords
  let bayiIterator = new Iterate(bayiler);

  let bayi = null;
  while ((bayi = bayiIterator.next()) != null) {
    // Get coords from addres by GeoCoder
    // let [lat, lng]: [number, number] = await UtilsObject.getLatLng(bayi.adres);
    
    // Get coords from data
    let [lat, lng]: [number, number] = bayi.position ? bayi.position : [0,0]

    MarkerObject.create({
      map,
      position: { lat, lng },
      unvan: bayi["unvan"],
      ruhsatNo: bayi["ruhsatNo"]
    });
  }

  // google.maps.event.addListenerOnce(map, 'tilesloaded', function(e){
  //   console.log("loaded")
  // })
  // var markerCluster = new MarkerClusterer(map, MarkerObject.markers, {
  //   imagePath:
  //     "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  // });
});


// function SelectContent (el) {    
//   var aux = document.createElement("div");
//   aux.setAttribute("contentEditable", "true");
//   aux.innerHTML = document.getElementById("main").innerHTML;
//   aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)"); 
//   document.body.appendChild(aux);
//   aux.focus();
//   document.execCommand("copy");
//   document.body.removeChild(aux);
// }