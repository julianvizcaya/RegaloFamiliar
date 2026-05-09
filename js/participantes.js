const participants = [
  {
    name: "Andrea",
    birthday: "13 Agosto / 2026",
    status: "Pendiente",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: false,
    progress: 0
  },
  {
    name: "Bibian",
    birthday: "25 Mayo / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Brayan",
    birthday: "20 Septiembre / 2026",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Demri",
    birthday: "15 Julio / 2026",
    status: "Al día",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Fabián",
    birthday: "18 Diciembre / 2026",
    status: "Al día",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Geraldine",
    birthday: "8 Noviembre / 2026",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Hugo",
    birthday: "6 Septiembre / 2026",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: false,
    progress: 8
  },
  {
    name: "Inés",
    birthday: "28 Enero / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Julián",
    birthday: "1 Abril / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Marinita",
    birthday: "14 Mayo / 2027",
    status: "Al día",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Mathías",
    birthday: "18 Agosto / 2026",
    status: "Al día",
    goal: 3000000,
    monthlyFee: 250000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Nancy",
    birthday: "28 Marzo / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Naty",
    birthday: "2 Febrero / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Nicolás",
    birthday: "24 Abril / 2027",
    status: "Pendiente",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: false,
    progress: 0
  },
  {
    name: "Nicole",
    birthday: "26 Mayo / 2027",
    status: "Pendiente",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: false,
    progress: 0
  },
  {
    name: "Óscar",
    birthday: "5 Abril / 2027",
    status: "Al día",
    goal: 1800000,
    monthlyFee: 150000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Peter",
    birthday: "9 Septiembre / 2026",
    status: "Al día",
    goal: 3000000,
    monthlyFee: 250000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Tere",
    birthday: "23 Septiembre / 2026",
    status: "Al día",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Teresita",
    birthday: "13 Octubre / 2026",
    status: "Al día",
    goal: 1500000,
    monthlyFee: 125000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Thomas",
    birthday: "22 Noviembre / 2026",
    status: "Al día",
    goal: 3000000,
    monthlyFee: 250000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Valery",
    birthday: "11 Julio / 2026",
    status: "Al día",
    goal: 3000000,
    monthlyFee: 250000,
    initialPercentPaid: true,
    progress: 8
  },
  {
    name: "Yaz",
    birthday: "24 Enero / 2027",
    status: "Al día",
    goal: 3000000,
    monthlyFee: 250000,
    initialPercentPaid: true,
    progress: 8
  },
];

const participantsGrid = document.querySelector("#participantsGrid");

function formatMoney(value) {
  return `$${value.toLocaleString("es-CO").replace(/,/g, "’")}`;
}

function createParticipantCard(participant) {
  const isPending = participant.status === "Pendiente";

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
          <strong>${participant.progress}%</strong>
        </div>

        <div class="participant-card__bar">
          <span style="width: ${participant.progress}%;"></span>
        </div>
      </div>

      <a class="participant-card__link" href="#">
        <i class="ri-edit-box-line"></i>
        Ver historial de pagos
      </a>

    </article>
  `;
}

function renderParticipants() {
  participantsGrid.innerHTML = participants
    .map(createParticipantCard)
    .join("");
}

renderParticipants();

const searchInput = document.querySelector("#participantsSearch");

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(value)
  );

  participantsGrid.innerHTML = filteredParticipants
    .map(createParticipantCard)
    .join("");
});