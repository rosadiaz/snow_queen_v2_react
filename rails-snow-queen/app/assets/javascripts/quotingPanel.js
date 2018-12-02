class QuotingPanel {
  constructor() {
    this.polygons = {};
    this.totalAreaInSqFt = null;
    this.totalDue = null;
  }

  showAddress(geocodedAdress) {
    if (geocodedAdress) {
      let addressNode = document.getElementById("displayAddress");
      while (addressNode.firstChild) { addressNode.removeChild(addressNode.firstChild) }
      let splitAddress = geocodedAdress.split(",");
      splitAddress.forEach(element => {
        let div = document.createElement("div");
        div.innerText = element;
        addressNode.appendChild(div);
      });
      addressNode.classList.remove("hidden");
    }
  }

  handlePolygonChanged (polygons) {
    this.polygons = polygons;
    let aggregateAreaInMts = this.aggregateAreaInMts();
    this.totalAreaInSqFt = this.convertToSqFt(aggregateAreaInMts);
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
  }

  updateTotalDueNode() {
    let totalDueNode = document.getElementById("totalDue");
    totalDueNode.innerText = `${this.totalDue.toFixed(2)}`;
  }
}


