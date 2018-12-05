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
    quoteFormNode.addEventListener("ajax:success", this.handleSuccess);
    $("#successModal").on("hide.bs.modal", this.handleReload)
  }

  handleOpenModal() {
    let quoteData = this.onOpen();
    let polygonsLatLngs = this.getPolygonsJSON(quoteData.polygons);

    let splitAddress = quoteData.geocodedAddress.split(",");
    let addressNode = document.getElementById("addressModal");
    addressNode.innerText = splitAddress;

    const areaNode = document.getElementById("areaModal");
    areaNode.innerText = `${quoteData.totalAreaInSqFt.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    
    const totalDueNode = document.getElementById("totalModal");
    totalDueNode.innerText = `${quoteData.totalDue.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
    
    const addressNodeForm = document.getElementById("quote_address");
    addressNodeForm.value = quoteData.geocodedAddress;
    
    const areaNodeForm = document.getElementById("quote_area");
    areaNodeForm.value = quoteData.totalAreaInSqFt;

    const totalDueNodeForm = document.getElementById("quote_total");
    totalDueNodeForm.value = quoteData.totalDue;

    const polygonsNodeForm = document.getElementById("quote_polygons");
    polygonsNodeForm.value = polygonsLatLngs;
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

  handleSuccess(event) {
    $("#submitQuoteModal").modal("hide");
    $("#successModal").modal("show");
  }

  handleReload() {
    location.reload();
  }
}

