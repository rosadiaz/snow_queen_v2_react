class QuotingPanel {
  constructor() {
    this.polygons = {};
    this.totalAreaInSqFt = null;
    this.totalDue = null;

    this.handleQuoteSubmit = this.handleQuoteSubmit.bind(this);
    this.addListeners();
  }

  showAddress(geocodedAdress) {
    if (geocodedAdress) {
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

    }
  }

  updateTotals(polygons) {
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

    let areaNodeInModal = document.getElementById("areaModal");
    areaNodeInModal.innerText = `${this.totalAreaInSqFt.toFixed(0)}`;

    this.totalDue = this.totalAreaInSqFt * PRICE_PER_SQ_FT;
    let totalDueNode = document.getElementById("totalDue");
    totalDueNode.innerText = `${this.totalDue.toFixed(2)}`;

    let totalDueNodeInModal = document.getElementById("totalModal");
    totalDueNodeInModal.innerText = `${this.totalDue.toFixed(2)}`;
  }

  addListeners() {
    document.getElementById('SubmitQuote').addEventListener('submit', this.handleQuoteSubmit);
  }

  handleQuoteSubmit(event) {
    event.preventDefault();
  }
}


