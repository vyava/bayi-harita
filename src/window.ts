class InfoWindowObject {
  public lastWindow: google.maps.InfoWindow;
  DEFAULT_CONTENT = {
    il: "",
    ilce: "",
    ruhsatNo: "",
    unvan: "",
    adres: "",
    tip: "",
    durum: ""
  };
  constructor() {
    this.setInfoWindow();
  }
  // Create InfoWindow instance for marker
  public setInfoWindow(data: Object = this.DEFAULT_CONTENT) {
    console.log(data);
    const content = `
      <div style="width:350px;min-height:270px" class="table-responsive">
        <h5>${data["unvan"]}</h5>
        <a href="javascript:;" class="badge badge-primary float-right clipboard" onmouseleave="setTimeout(() => {resetClipboard(event)} ,1500)" onClick="selectElementContents(document.getElementById('InfoTable'), event);">Kopyala</a>
        <table class="table table-hover" id="InfoTable">
          <tbody>
              <tr>
                <th class="w-40">Adı Soyadı</th>
                  <td>Mehmet Genç</td>
              </tr>
              <tr>
                <th>İl</th>
                  <td>${data["il"]}</td>
              </tr>
              <tr>
                <th>İlçe</th>
                  <td>${data["ilce"]}</td>
              </tr>
              <tr>
                <th>Ruhsat No</th>
                  <td>${data["ruhsatNo"]}</td>
              </tr>
              <tr>
                <th>TİP</th>
                  <td>${data["tip"]}</td>
              </tr>
              <tr>
                <th>TİP DSD</th>
                  <td>${data["tipDsd"] || ""}</td>
              </tr>
              <tr>
                <th>Adres</th>
                  <td>${data["adres"]}</td>
              </tr>
          </tbody>
      </table>
      </div>
    `;

    if (!this.lastWindow) {
      this.lastWindow = new google.maps.InfoWindow({
        content
      });
    } else {
      this.lastWindow.setContent(content);
    }
  }

  // private setInfoWindowHtml(marker: google.maps.Marker) {}

  public listen(fn: Function) {
    this.lastWindow.addListener("closeclick", e => fn);
  }
}

export default InfoWindowObject;
