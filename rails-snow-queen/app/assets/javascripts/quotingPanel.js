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

  updateTotals(polygons) {
    let SQ_FT_CONVERT = 10.764;
    const PRICE_PER_SQ_FT = 0.15;

    let totalAreaInMts = 0;
    this.polygons = polygons;
    console.log("this.polygons: ", this.polygons)
    polygons.forEach((p) => { 
      let areaInMts = google.maps.geometry.spherical.computeArea(p.getPath());
      console.log("Area (mts): ", areaInMts)
      totalAreaInMts += areaInMts;
      console.log("Total area(mts): ", totalAreaInMts)
    });

    this.totalAreaInSqFt = totalAreaInMts * SQ_FT_CONVERT;
    console.log("Total area(FT): ", this.totalAreaInSqFt)

    let areaNode = document.getElementById("calculatedArea");
    areaNode.innerText = `Selected area: ${this.totalAreaInSqFt.toFixed(0)} sq ft`;
    areaNode.parentNode.classList.remove("hidden");

    this.totalDue = this.totalAreaInSqFt * PRICE_PER_SQ_FT;
    let totalDueNode = document.getElementById("totalDue");
    totalDueNode.innerText = `Total    $${this.totalDue.toFixed(2)}`;
  }
}


