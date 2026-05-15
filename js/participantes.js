const participantsGrid = document.querySelector("#participantsGrid");

function formatMoney(value) {
  return `$${value.toLocaleString("es-CO").replace(/,/g, "’")}`;
}

function getParticipantTotalPaid(participant) {
  return participant.payments?.reduce((total, payment) => {
    return total + payment.paid;
  }, 0) || 0;
}

function getParticipantProgress(participant) {
  const totalPaid = getParticipantTotalPaid(participant);

  if (participant.goal === 0) return 0;

  return Math.round((totalPaid / participant.goal) * 100);
}

function createParticipantCard(participant) {
  const isPending = participant.status === "Pendiente";
  const progress = getParticipantProgress(participant);
  
  return `
    <article class="participant-card">

      <div class="participant-card__header">
        <div>
          <h2 class="participant-card__name">${participant.name}</h2>

          <p class="participant-card__date">
            <i class="ri-gift-line"></i>
            ${participant.birthday}
          </p>
        </div>

        <span class="participant-card__status ${
          isPending
            ? "participant-card__status--pending"
            : "participant-card__status--success"
        }">
          <i class="${
            isPending ? "ri-information-line" : "ri-checkbox-circle-line"
          }"></i>
          ${participant.status}
        </span>
      </div>

      <div class="participant-card__body">
        <div class="participant-card__row">
          <span>Meta ahorro:</span>
          <strong class="text-primary">${formatMoney(participant.goal)}</strong>
        </div>

        <div class="participant-card__row">
          <span>Cuota mensual:</span>
          <strong>${formatMoney(participant.monthlyFee)}</strong>
        </div>

        <div class="participant-card__row">
          <span>1%:</span>
          <strong class="${participant.initialPercentPaid ? "text-success" : "text-danger"}">
            ${participant.initialPercentPaid ? "Abonado" : "Pendiente"}
          </strong>
        </div>
      </div>

      <div class="participant-card__progress">
        <div class="participant-card__progress-head">
          <span>Progreso:</span>
          <strong>${progress}%</strong>
        </div>

        <div class="participant-card__bar">
          <span style="width: ${progress}%;"></span>
        </div>
      </div>

      <button
        class="participant-card__link"
        type="button"
        data-participant-name="${participant.name}">
  
        <i class="ri-edit-box-line"></i>
        Ver historial de pagos
        </button>

    </article>
  `;
}

function renderParticipants() {
  participantsGrid.innerHTML = participants.map(createParticipantCard).join("");
}

renderParticipants();

const searchInput = document.querySelector("#participantsSearch");

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(value),
  );

  participantsGrid.innerHTML = filteredParticipants
    .map(createParticipantCard)
    .join("");
});

const paymentModal = document.querySelector("#paymentModal");
const closePaymentModal = document.querySelector("#closePaymentModal");
const modalName = document.querySelector(".payment-modal__name");
const modalDate = document.querySelector(".payment-modal__date");
const paymentTableRows = document.querySelector("#paymentTableRows");
const modalGoal = document.querySelector("#modalGoal");
const modalTotalPaid = document.querySelector("#modalTotalPaid");
const modalPending = document.querySelector("#modalPending");
const modalInitialStatus = document.querySelector("#modalInitialStatus");
let scrollPosition = 0;

function closePaymentModalHandler() {
  paymentModal.classList.add("is-hidden");

  document.body.classList.remove("modal-open");
  document.documentElement.classList.remove("modal-open");

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(0, scrollPosition);
}

/*function closePaymentModalHandler() {
  paymentModal.classList.add("is-hidden");

  document.body.classList.remove("modal-open");
  document.documentElement.classList.remove("modal-open");
}*/

function renderPaymentsTable(payments) {
  paymentTableRows.innerHTML = payments
    .map((payment) => {
      const isPaid = payment.status === "Pagado";

      return `
        <div class="payment-table__row ${isPaid ? "payment-table__row--paid" : ""}">
          <span>${payment.month}</span>
          <span>${formatMoney(payment.fee)}</span>
          <span>${payment.paid > 0 ? formatMoney(payment.paid) : "$--"}</span>
          <span class="payment-status ${
            isPaid ? "payment-status--paid" : "payment-status--next"
          }">
            ${payment.status}
          </span>
        </div>
      `;
    })
    .join("");
}

document.addEventListener("click", (event) => {
  const modalButton = event.target.closest("[data-participant-name]");

  if (!modalButton) return;

  const participantName = modalButton.dataset.participantName;

  const participant = participants.find(
    (item) => item.name === participantName,
  );

  if (!participant) return;

  const totalPaid = participant.payments.reduce(
    (acc, payment) => acc + payment.paid,
    0,
  );

  const pendingAmount = participant.goal - totalPaid;

  modalName.textContent = participant.name;

  modalDate.innerHTML = `
    <i class="ri-cake-2-line"></i>
    ${participant.birthday}
  `;

  modalGoal.textContent = formatMoney(participant.goal);

  modalTotalPaid.textContent = formatMoney(totalPaid);

  modalPending.textContent = formatMoney(pendingAmount);

  modalInitialStatus.innerHTML = participant.initialPercentPaid
    ? `
    <i class="ri-checkbox-circle-line"></i>
    Abonado
  `
    : `
    <i class="ri-error-warning-line"></i>
    Pendiente
  `;

  modalInitialStatus.className = participant.initialPercentPaid
    ? "pill pill--success"
    : "pill pill--danger";

  renderPaymentsTable(participant.payments || []);

scrollPosition = window.scrollY;

paymentModal.classList.remove("is-hidden");

document.body.classList.add("modal-open");
document.documentElement.classList.add("modal-open");

document.body.style.position = "fixed";
document.body.style.top = `-${scrollPosition}px`;
document.body.style.width = "100%";

/*paymentModal.classList.remove("is-hidden");
document.body.classList.add("modal-open");*/
}); 

closePaymentModal.addEventListener("click", closePaymentModalHandler);

paymentModal.addEventListener("click", (event) => {
  const clickedOutsideModal = event.target.classList.contains(
    "payment-modal__overlay"
  );

  if (!clickedOutsideModal) return;

  closePaymentModalHandler();
});