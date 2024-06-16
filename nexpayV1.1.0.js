(function () {
  // Create and append the CSS for the modal
  const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .nexpay-modal {
      display: block; /* Hidden by default */
      position: fixed;
      z-index: 1000; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // overflow: auto; /* Enable scroll if needed */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  .nexpay-modal-content {
      position: relative;
      background-color: #fefefe;
      margin: 10% auto; /* 10% from the top and centered */
      padding: 0;
      border: 1px solid #888;
      width: 35%; /* Could be more or less, depending on screen size */
      min-width: 350px;
      height: 70%; /* Adjust as necessary */
      min-height: 600px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      animation-name: animatetop;
      animation-duration: 0.4s;
      border-radius: 10px;
  }
  @keyframes animatetop {
      from {top:-300px; opacity:0}
      to {top:0; opacity:1}
  }
  .nexpay-close {
      position: absolute;
      top: 10px;
      right: 25px;
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
  }
  .nexpay-close:hover,
  .nexpay-close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
  }
  iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 10px;
  }
  .nexpay-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #888;
        z-index: 1000;
    }
  // @media (max-width: 600px) {
  //       .nexpay-modal-content {
  //         height: 500px;
  //         backgound-color: black;
  //       }
        
  //       iframe {
  //         backgound-color: black;
  //       }
  //   }
  `;

  // Append the CSS to the head of the document
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  window.nexpay = {
    open: function (options) {
      // Make the POST request to the process_payment endpoint
      fetch("http://127.0.0.1:5000/process_payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: options.apiKey,
          amount: options.amount,
          currency: options.currency,
          orderID: options.orderID
        }),

      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // Display the modal with payment information
            showModal(data.payment_url);
          } else {
            alert("Payment processing failed: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while processing the payment.");
        });

      // showModal("https://pratikthakur.pythonanywhere.com/static/payments.html")
    },
  };

  function showModal(paymentUrl) {
    // Create the modal elements
    let modal = document.createElement("div");
    modal.id = "nexpayModal";
    modal.className = "nexpay-modal";

    let modalContent = document.createElement("div");
    modalContent.className = "nexpay-modal-content";

    let closeBtn = document.createElement("span");
    closeBtn.className = "nexpay-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = function () {
      document.body.removeChild(modal);
      document.body.style.overflow = "auto"; // Re-enable scroll
    };

    let loadingScreen = document.createElement("div");
    loadingScreen.className = "nexpay-loading";
    // loadingScreen.innerText = "Loading...";
    loadingScreen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(80,50)">
<g transform="rotate(0)">
<circle fill-opacity="1" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.875s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.875s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(71.21320343559643,71.21320343559643)">
<g transform="rotate(45)">
<circle fill-opacity="0.875" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.75s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.75s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(50,80)">
<g transform="rotate(90)">
<circle fill-opacity="0.75" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.625s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.625s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(28.786796564403577,71.21320343559643)">
<g transform="rotate(135)">
<circle fill-opacity="0.625" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.5s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.5s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(20,50.00000000000001)">
<g transform="rotate(180)">
<circle fill-opacity="0.5" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.375s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.375s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(28.78679656440357,28.786796564403577)">
<g transform="rotate(225)">
<circle fill-opacity="0.375" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.25s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.25s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(49.99999999999999,20)">
<g transform="rotate(270)">
<circle fill-opacity="0.25" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="-0.125s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="-0.125s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g transform="translate(71.21320343559643,28.78679656440357)">
<g transform="rotate(315)">
<circle fill-opacity="0.125" fill="#000000" r="6" cy="0" cx="0">
  <animateTransform repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.5 1.5;1 1" begin="0s" type="scale" attributeName="transform"></animateTransform>
  <animate begin="0s" values="1;0" repeatCount="indefinite" dur="1s" keyTimes="0;1" attributeName="fill-opacity"></animate>
</circle>
</g>
</g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>`;

    let iframe = document.createElement("iframe");
    iframe.src = paymentUrl;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "none";

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(loadingScreen);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Apply styles to disable scroll on body
    document.body.style.overflow = "hidden";

    iframe.onload = function () {
      loadingScreen.style.display = "none";
    };
  }

  // Close modal if user clicks outside of modal content
  window.onclick = function (event) {
    let modal = document.getElementById("nexpayModal");
    if (event.target == modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = "auto"; // Re-enable scroll
    }
  };
})();

// class NexPay {
//   open(data) {
//     const blurOverlay = document.createElement("div");
//     blurOverlay.style.position = "fixed";
//     blurOverlay.style.top = "0";
//     blurOverlay.style.left = "0";
//     blurOverlay.style.width = "100%";
//     blurOverlay.style.height = "100%";
//     blurOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//     blurOverlay.style.zIndex = "999";
//     blurOverlay.style.backdropFilter = "blur(5px)";

//     const modalOverlay = document.createElement("div");
//     modalOverlay.style.position = "fixed";
//     modalOverlay.style.top = "0";
//     modalOverlay.style.left = "0";
//     modalOverlay.style.width = "100%";
//     modalOverlay.style.height = "100%";
//     modalOverlay.style.display = "flex";
//     modalOverlay.style.justifyContent = "center";
//     modalOverlay.style.alignItems = "center";
//     modalOverlay.style.zIndex = "1000";

//     const modal = document.createElement("div");
//     modal.style.backgroundColor = "white";
//     modal.style.padding = "20px";
//     modal.style.borderRadius = "10px";
//     modal.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";

//     const form = document.createElement("form");
//     form.style.display = "flex";
//     form.style.flexDirection = "column";

//     const nameInput = this.createInput(
//       "Name",
//       "text",
//       data && data.name ? data.name : ""
//     );
//     const amountInput = this.createInput(
//       "Amount",
//       "number",
//       data && data.amount ? data.amount : ""
//     );
//     const phoneInput = this.createInput(
//       "Phone No",
//       "tel",
//       data && data.phoneno ? data.phoneno : ""
//     );

//     const submitButton = this.createButton("Submit", "submit");
//     const cancelButton = this.createButton("Cancel", "button");

//     form.appendChild(nameInput);
//     form.appendChild(amountInput);
//     form.appendChild(phoneInput);
//     form.appendChild(submitButton);
//     form.appendChild(cancelButton);

//     modal.appendChild(form);

//     document.body.appendChild(blurOverlay);
//     document.body.appendChild(modalOverlay);
//     modalOverlay.appendChild(modal);

//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const formData = {
//         name: nameInput.querySelector("input").value,
//         amount: amountInput.querySelector("input").value,
//         phone: phoneInput.querySelector("input").value,
//       };
//       this.handleSubmit(formData);
//       this.closeModal(modalOverlay, blurOverlay);
//     });

//     cancelButton.addEventListener("click", () => {
//       this.closeModal(modalOverlay, blurOverlay);
//     });
//   }

//   createInput(labelText, type, value = "") {
//     const label = document.createElement("label");
//     label.style.marginBottom = "10px";
//     label.style.display = "flex";
//     label.style.flexDirection = "column";
//     label.innerText = labelText;

//     const input = document.createElement("input");
//     input.type = type;
//     input.style.padding = "10px";
//     input.style.marginTop = "5px";
//     input.style.boxSizing = "border-box";
//     input.style.width = "100%";
//     input.value = value;

//     label.appendChild(input);
//     return label;
//   }

//   createButton(buttonText, type) {
//     const button = document.createElement("button");
//     button.innerText = buttonText;
//     button.type = type;
//     button.style.padding = "10px 20px";
//     button.style.backgroundColor = "#007bff";
//     button.style.color = "white";
//     button.style.border = "none";
//     button.style.borderRadius = "5px";
//     button.style.cursor = "pointer";
//     button.style.marginTop = "10px";

//     if (buttonText === "Cancel") {
//       button.style.backgroundColor = "#6c757d";
//       button.style.marginLeft = "10px";
//     }

//     return button;
//   }

//   handleSubmit(formData) {
//     console.log(formData);
//   }

//   closeModal(modalOverlay, blurOverlay) {
//     document.body.removeChild(modalOverlay);
//     document.body.removeChild(blurOverlay);
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const nexp = new NexPay();
//   nexp.open();
// });
