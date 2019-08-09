class Utils {
  constructor() {}

  parseBayiler(elements) {
    let bayiler = [];
    // Iterate instance
    let elementArray = new Iterate(elements);
    let element = null;

    // Iterate for elements
    while ((element = elementArray.next()) != null) {
      let bayiInfo = JSON.parse(element.getAttribute("data-info"));

      bayiler.push(bayiInfo);
    }
    return bayiler;
  }

  getLatLng(adres): Promise<any> {
    return new Promise((resolve, reject) => {
      var geocoder;
      if (geocoder == undefined) {
        geocoder = new google.maps.Geocoder();
      }

      // Geocode an address.
      geocoder.geocode(
        {
          address: adres
        },
        (result, status) => {
          if (status == "OK") {
            var lat = result[0].geometry.location.lat();
            var lng = result[0].geometry.location.lng();
            var coords: number[] = [lat, lng];
            resolve(coords);
          } else {
            reject(status);
          }
        }
      );
    });
  }
}

class Iterate {
  array = [];
  i = 0;
  constructor(array) {
    this.array = [].slice.call(array);
  }

  next = () => {
    let el = this.array[this.i];
    this.i++;
    return el;
  };
}

export { Utils, Iterate };
