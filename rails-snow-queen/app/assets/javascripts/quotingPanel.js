class QuotingPanel {
  constructor() {
    this.polygons = {};
    this.geocodedAdress = null;
    this.totalAreaInSqFt = null;
    this.totalDue = null;

    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.handlePolygonChanged = this.handlePolygonChanged.bind(this);
    this.addListeners();
  }

  showAddress(geocodedAdress) {
    if (geocodedAdress) {
      this.geocodedAdress = geocodedAdress;
      let addressNode = document.getElementById("displayAddress");
      let splitAddress = geocodedAdress.split(",");
      while (addressNode.firstChild) { addressNode.removeChild(addressNode.firstChild) }
      splitAddress.forEach(element => {
        let div = document.createElement("div");
        div.innerText = element;
        addressNode.appendChild(div);
      });
      addressNode.classList.remove("hidden");

      let addressNodeInModal = document.getElementById("addressModal");
      addressNodeInModal.innerText = splitAddress;

      let addressNodeInModalForm = document.getElementById("quote_address");
      addressNodeInModalForm.value = this.geocodedAdress;

      //add to form address hidden
    }
  }

  handlePolygonChanged (polygons) {
    this.polygons = polygons;
    this.totalAreaInSqFt = this.convertToSqFt(this.aggregateAreaInMts());
    this.totalDue = this.calculateTotalDue();
    this.updateAreaNode();
    this.updateTotalDueNode();
  }
  
  aggregateAreaInMts() {
    let totalAreaInMts = 0;
    this.polygons.forEach((p) => { 
      let areaInMts = google.maps.geometry.spherical.computeArea(p.getPath());
      totalAreaInMts += areaInMts;
    });
    return totalAreaInMts;
  }

  convertToSqFt(totalAreaInMts) {
    return totalAreaInMts * constants.SQ_FT_CONVERT;
  }

  calculateTotalDue() {
    return this.totalAreaInSqFt * constants.PRICE_PER_SQ_FT;
  }

  updateAreaNode() {
    let areaNode = document.getElementById("calculatedArea");
    areaNode.innerText = `${this.totalAreaInSqFt.toFixed(0)}`;
    areaNode.parentNode.parentNode.classList.remove("hidden");
    
    let areaNodeInModal = document.getElementById("areaModal");
    areaNodeInModal.innerText = `${this.totalAreaInSqFt.toFixed(0)}`;

    let areaNodeInModalForm = document.getElementById("quote_area");
    areaNodeInModalForm.value = this.totalAreaInSqFt;

    //add to form hidden
  }

  updateTotalDueNode() {
    let totalDueNode = document.getElementById("totalDue");
    totalDueNode.innerText = `${this.totalDue.toFixed(2)}`;

    let totalDueNodeInModal = document.getElementById("totalModal");
    totalDueNodeInModal.innerText = `${this.totalDue.toFixed(2)}`;

    let totalDueNodeInModalForm = document.getElementById("quote_total");
    totalDueNodeInModalForm.value = this.totalDue;
  }

  addListeners() {
    document.getElementById('SubmitQuote').addEventListener('submit', this.handleQuoteSubmit);
  }

  handleQuoteSubmit(event) {
    event.preventDefault();
  }
}


