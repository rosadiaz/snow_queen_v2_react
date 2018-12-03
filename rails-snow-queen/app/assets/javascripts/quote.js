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
  }

  handleErrors(event) {
    this.errors = event.detail[0].errors;
    let errorNode = document.getElementById("modal_errors");
    errorNode.classList.remove("hidden");
    errorNode.innerText = this.errors.join(", ");
  }

  handleSuccess(event) {
    //abrir thank you modal
  }
}

