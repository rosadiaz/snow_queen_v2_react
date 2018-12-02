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

  handlePolygonChanged(polygons) {
    let SQ_FT_CONVERT = 10.764;
    const PRICE_PER_SQ_FT = 0.15;

    let totalAreaInMts = 0;
    this.polygons = polygons;
    polygons.forEach((p) => { 
      let areaInMts = google.maps.geometry.spherical.computeArea(p.getPath());
      totalAreaInMts += areaInMts;
    });

    this.totalAreaInSqFt = totalAreaInMts * SQ_FT_CONVERT;

    let areaNode = document.getElementById("calculatedArea");
    areaNode.innerText = `${this.totalAreaInSqFt.toFixed(0)}`;
    areaNode.parentNode.parentNode.classList.remove("hidden");

    this.totalDue = this.totalAreaInSqFt * PRICE_PER_SQ_FT;
    let totalDueNode = document.getElementById("totalDue");
    totalDueNode.innerText = `${this.totalDue.toFixed(2)}`;
  }
}


