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
    document.getElementById("new_quote").addEventListener("ajax:error", this.handleErrors);
    document.getElementById("new_quote").addEventListener("ajax:success", this.handleSuccess);
  }

  handleOpenModal() {
    let quoteData = this.onOpen();
    let polygonsLatLngs = this.getPolygonsJSON(quoteData.polygons);

    let splitAddress = quoteData.geocodedAddress.split(",");
    let addressNodeInModal = document.getElementById("addressModal");
    addressNodeInModal.innerText = splitAddress;

    let areaNodeInModal = document.getElementById("areaModal");
    areaNodeInModal.innerText = `${quoteData.totalAreaInSqFt.toFixed(0)}`;
    
    let totalDueNodeInModal = document.getElementById("totalModal");
    totalDueNodeInModal.innerText = `${quoteData.totalDue.toFixed(2)}`;
    
    let addressNodeInModalForm = document.getElementById("quote_address");
    addressNodeInModalForm.value = quoteData.geocodedAddress;
    
    let areaNodeInModalForm = document.getElementById("quote_area");
    areaNodeInModalForm.value = quoteData.totalAreaInSqFt;

    let totalDueNodeInModalForm = document.getElementById("quote_total");
    totalDueNodeInModalForm.value = quoteData.totalDue;

    // let polygonsLatLngs = quoteData.polygons.map(p => { 
    //   return p.getPath().getArray().map(vertex => { return vertex.toJSON() })
    // });
    // console.log("JSON.stringify(polygonsLatLngs): ", JSON.stringify(polygonsLatLngs));

    let polygonsNodeInModalForm = document.getElementById("quote_polygons");
    polygonsNodeInModalForm.value = polygonsLatLngs;
  }

  getPolygonsJSON(polygons){
    let polygonsLatLngs = polygons.map(p => { 
      return p.getPath().getArray().map(vertex => { return vertex.toJSON() })
    });
    console.log("JSON.stringify(polygonsLatLngs): ", JSON.stringify(polygonsLatLngs));
    return JSON.stringify(polygonsLatLngs);
  }

  handleErrors(event) {
    this.errors = event.detail[0].errors;
    let errorNode = document.getElementById("modal_errors");
    errorNode.classList.remove("hidden");
    errorNode.innerText = this.errors.join(", ");
  }

  handleSuccess(event) {
    $("#submitQuoteModal").modal("hide");
    //window. refresh or reload when thank you modal closes
  }
}

