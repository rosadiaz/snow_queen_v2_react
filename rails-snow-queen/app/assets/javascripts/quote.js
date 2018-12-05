class Quote {
  constructor(config) {
    this.errors = null;
    this.onOpen = config.onOpen;
    
    this.handleErrors = this.handleErrors.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.addListeners();
  }
  
  addListeners() {
    $("#submitQuoteModal").on("show.bs.modal", this.handleOpenModal);

    const quoteFormNode = document.getElementById("new_quote");
    quoteFormNode.addEventListener("ajax:error", this.handleErrors);
    quoteFormNode.addEventListener("ajax:success", () => { $("#submitQuoteModal").modal("hide") });
    
    $("#successModal").on("hide.bs.modal", () => { location.reload() });
  }

  handleOpenModal() {
    let quoteData = this.onOpen();
    let polygonsLatLngs = this.getPolygonsJSON(quoteData.polygons);

    let splitAddress = quoteData.geocodedAddress.split(",");
    let addressNodeInModal = document.getElementById("addressModal");
    addressNodeInModal.innerText = splitAddress;

    const areaNodeInModal = document.getElementById("areaModal");
    areaNodeInModal.innerText = `${quoteData.totalAreaInSqFt.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    
    const totalDueNodeInModal = document.getElementById("totalModal");
    totalDueNodeInModal.innerText = `${quoteData.totalDue.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
    
    const addressNodeInModalForm = document.getElementById("quote_address");
    addressNodeInModalForm.value = quoteData.geocodedAddress;
    
    const areaNodeInModalForm = document.getElementById("quote_area");
    areaNodeInModalForm.value = quoteData.totalAreaInSqFt;

    const totalDueNodeInModalForm = document.getElementById("quote_total");
    totalDueNodeInModalForm.value = quoteData.totalDue;

    const polygonsNodeInModalForm = document.getElementById("quote_polygons");
    polygonsNodeInModalForm.value = polygonsLatLngs;
  }

  getPolygonsJSON(polygons){
    let polygonsLatLngs = polygons.map(p => { 
      return p.getPath().getArray().map(vertex => { return vertex.toJSON() })
    });
    return JSON.stringify(polygonsLatLngs);
  }

  handleErrors(event) {
    this.errors = event.detail[0].errors;
    const errorNode = document.getElementById("modal_errors");
    errorNode.classList.remove("hidden");
    errorNode.innerText = this.errors.join(", ");
  }

}

