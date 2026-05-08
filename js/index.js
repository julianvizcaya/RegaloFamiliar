/* ============================================================
   REGALOFAMILIAR — PIN
   ============================================================ */

const PIN_CORRECTO = "5854";
const PIN_LENGTH = 4;

let pinActual = "";

const pinNumbers = document.querySelectorAll("[data-pin-number]");
const pinDelete = document.querySelector("[data-pin-delete]");
const pinDots = document.querySelectorAll("[data-pin-dot]");
const pinError = document.querySelector(".pin__error");

function updatePinDots() {
  pinDots.forEach((dot, index) => {
    dot.classList.toggle("pin__dot--active", index < pinActual.length);
  });
}

function showPinError() {
  pinError.classList.add("pin__error--visible");
}

function hidePinError() {
  pinError.classList.remove("pin__error--visible");
}

function resetPin() {
  pinActual = "";
  updatePinDots();
}

function validatePin() {
  if (pinActual === PIN_CORRECTO) {
    const pinScreen = document.querySelector(".pin");
    const app = document.querySelector("[data-app]");

    pinScreen.classList.add("is-hidden");
    app.classList.remove("is-hidden");

    return;
  }

  showPinError();
  resetPin();
}

function addNumberToPin(number) {
  if (pinActual.length >= PIN_LENGTH) return;

  hidePinError();

  pinActual += number;

  updatePinDots();

  if (pinActual.length === PIN_LENGTH) {
    setTimeout(validatePin, 180);
  }
}

function deletePinNumber() {
  pinActual = pinActual.slice(0, -1);

  updatePinDots();
}

pinNumbers.forEach((button) => {
  button.addEventListener("click", () => {
    addNumberToPin(button.dataset.pinNumber);
  });
});

pinDelete.addEventListener("click", deletePinNumber);
