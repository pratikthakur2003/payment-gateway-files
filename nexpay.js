class ModalForm {

  open(data) {
    const blurOverlay = document.createElement("div");
    blurOverlay.style.position = "fixed";
    blurOverlay.style.top = "0";
    blurOverlay.style.left = "0";
    blurOverlay.style.width = "100%";
    blurOverlay.style.height = "100%";
    blurOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    blurOverlay.style.zIndex = "999";
    blurOverlay.style.backdropFilter = "blur(5px)";

    const modalOverlay = document.createElement("div");
    modalOverlay.style.position = "fixed";
    modalOverlay.style.top = "0";
    modalOverlay.style.left = "0";
    modalOverlay.style.width = "100%";
    modalOverlay.style.height = "100%";
    modalOverlay.style.display = "flex";
    modalOverlay.style.justifyContent = "center";
    modalOverlay.style.alignItems = "center";
    modalOverlay.style.zIndex = "1000";

    const modal = document.createElement("div");
    modal.style.backgroundColor = "white";
    modal.style.padding = "20px";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";

    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";

    const nameInput = this.createInput(
      "Name",
      "text",
      data && data.name ? data.name : ""
    );
    const amountInput = this.createInput(
      "Amount",
      "number",
      data && data.amount ? data.amount : ""
    );
    const phoneInput = this.createInput(
      "Phone No",
      "tel",
      data && data.phoneno ? data.phoneno : ""
    );

    const submitButton = this.createButton("Submit", "submit");
    const cancelButton = this.createButton("Cancel", "button");

    form.appendChild(nameInput);
    form.appendChild(amountInput);
    form.appendChild(phoneInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    modal.appendChild(form);

    document.body.appendChild(blurOverlay);
    document.body.appendChild(modalOverlay);
    modalOverlay.appendChild(modal);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: nameInput.querySelector("input").value,
        amount: amountInput.querySelector("input").value,
        phone: phoneInput.querySelector("input").value,
      };
      this.handleSubmit(formData);
      this.closeModal(modalOverlay, blurOverlay);
    });

    cancelButton.addEventListener("click", () => {
      this.closeModal(modalOverlay, blurOverlay);
    });
  }

  createInput(labelText, type, value = "") {
    const label = document.createElement("label");
    label.style.marginBottom = "10px";
    label.style.display = "flex";
    label.style.flexDirection = "column";
    label.innerText = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.style.padding = "10px";
    input.style.marginTop = "5px";
    input.style.boxSizing = "border-box";
    input.style.width = "100%";
    input.value = value; // Set initial value

    label.appendChild(input);
    return label;
  }

  createButton(buttonText, type) {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.type = type;
    button.style.padding = "10px 20px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.marginTop = "10px";

    if (buttonText === "Cancel") {
      button.style.backgroundColor = "#6c757d";
      button.style.marginLeft = "10px";
    }

    return button;
  }

  handleSubmit(formData) {
    console.log(formData);
  }

  closeModal(modalOverlay, blurOverlay) {
    document.body.removeChild(modalOverlay);
    document.body.removeChild(blurOverlay);
  }
}
