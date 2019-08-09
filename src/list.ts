// import Marker from "./marker";

class List {
  MarkerObject;
  elementList : [HTMLElement];
  headerList : [HTMLElement] = <any>[];
  constructor() {
    // this.MarkerObject = new Marker();
    // this.getHeaderList();
    // this.headerList.map(el => el.addEventListener('click', this.headerClick))
  }
  lastSelectedListElement;
  lastSelectedHeaderElement;
  selectBayiFromList(ruhsatNo: string) {
    this.removeActiveElementFromList();
    let el = document.getElementById(ruhsatNo);
    el.classList.add("active");

    this.lastSelectedListElement = el;
    return JSON.parse(el.getAttribute("data-info"));
  }

  headerClick(e){
    let header : HTMLElement = e.target;
    let id = header.getAttribute("id");
    this.removeActiveElementFromHeader();
    header.classList.add("active");
    this.lastSelectedHeaderElement = header;
    for(let el of this.elementList){
      if(!el.classList.contains(id)){
        el.classList.add("d-none")
      }else{
        el.classList.remove("d-none")
      }
    }
    
  }
  
  removeActiveElementFromList() {
    if (this.lastSelectedListElement) {
      this.lastSelectedListElement.classList.remove("active");
    }
  }

  removeActiveElementFromHeader() {
    if(this.lastSelectedHeaderElement){
      return this.lastSelectedHeaderElement.classList.remove("active");
    }
  }

  getElementList() {
    this.elementList = [].slice.call(document.getElementsByClassName("list-group-item"));
    
    return this.elementList;
  }

  setHeaderDisable() {
    let headersStatus = {
      aktif : 0,
      pasif : 0,
      iptal : 0
    };
    
    for(let el of this.elementList){
      let durum = el.getAttribute("data-durum");
      headersStatus[durum] = 1;
    };
    Object.keys(headersStatus).map(key => {
      
      if(headersStatus[key] == 0){
        [].slice.call(this.headerList)
          .find(h => h.getAttribute("id") ==  key)
          .classList.add("disabled")
      }
    })
  }

  getHeaderList(){
    this.headerList = <any>document.getElementsByClassName("nav-link");

    for(let header of this.headerList){
      header.addEventListener('click', (ev) => this.headerClick(ev))
    }
    this.lastSelectedHeaderElement = this.headerList[0];
    return this.headerList;
  }

  addClickHandlerList(fn) {
    const listWrapper = document.getElementById("list");
    listWrapper.addEventListener('click', (e: any) => {
      let target: HTMLElement = e.target;
      if (target.classList.contains("list-group-item")) {
        let ruhsatNo = target.getAttribute("id");
        fn(ruhsatNo)
      }
    });
  };

  addClickHandlerHeader(fn){
    const headerWrapper = document.getElementById("filter");

    headerWrapper.addEventListener('click', (e : any) => {
      let target : HTMLElement = e.target;
      if(target.classList.contains("nav-link")) {
        let durum = target.getAttribute("id");
        fn(durum)
      }
    })
  }
}

export default List;
