function getTotalPaid() {
  return participants.reduce((total, participant) => {
    const participantPaid = participant.payments.reduce((sum, payment) => {
      return sum + payment.paid;
    }, 0);

    return total + participantPaid;
  }, 0);
}

function getGroupGoal() {
  return participants.reduce((total, participant) => {
    return total + participant.goal;
  }, 0);
}

function getPendingAmount() {
  return getGroupGoal() - getTotalPaid();
}

function getTotalDeliveredGifts() {
  return deliveredGifts.reduce((total, gift) => {
    return total + gift.amount;
  }, 0);
}

function getAvailableFund() {
  return getTotalPaid() - getTotalDeliveredGifts();
}

function getGeneralProgress() {
  const goal = getGroupGoal();

  if (goal === 0) return 0;

  return Math.round((getTotalPaid() / goal) * 100);
}

function formatMoney(value) {
  return `$${value.toLocaleString("es-CO").replace(/,/g, "’")}`;
}

const MONTHS = {
  Enero: 0,
  Febrero: 1,
  Marzo: 2,
  Abril: 3,
  Mayo: 4,
  Junio: 5,
  Julio: 6,
  Agosto: 7,
  Septiembre: 8,
  Octubre: 9,
  Noviembre: 10,
  Diciembre: 11,
};

function parseBirthdayDate(birthday) {
  const [day, month, , year] = birthday.split(" ");

  return new Date(Number(year), MONTHS[month], Number(day));
}

function getUpcomingBirthdays(limit = 3) {
  const today = new Date();

  return participants
    .map((participant) => ({
      ...participant,
      birthdayDate: parseBirthdayDate(participant.birthday),
    }))
    .filter((participant) => participant.birthdayDate >= today)
    .sort((a, b) => a.birthdayDate - b.birthdayDate)
    .slice(0, limit);
}

const dashboardParticipants = document.querySelector("#dashboardParticipants");
const dashboardGoal = document.querySelector("#dashboardGoal");
const dashboardTotalPaid = document.querySelector("#dashboardTotalPaid");
const dashboardGoalMeta = document.querySelector("#dashboardGoalMeta");
const dashboardPending = document.querySelector("#dashboardPending");
const dashboardAvailable = document.querySelector("#dashboardAvailable");

const dashboardProgressPercent = document.querySelector("#dashboardProgressPercent");
const dashboardProgressBar = document.querySelector("#dashboardProgressBar");
const dashboardProgressPaid = document.querySelector("#dashboardProgressPaid");
const dashboardProgressGoal = document.querySelector("#dashboardProgressGoal");
const dashboardDeliveredGifts = document.querySelector("#dashboardDeliveredGifts");
const upcomingBirthdays = document.querySelector("#upcomingBirthdays");
const deliveredGiftsList = document.querySelector("#deliveredGiftsList");

function renderUpcomingBirthdays() {
  const birthdays = getUpcomingBirthdays(3);

  upcomingBirthdays.innerHTML = birthdays
    .map((participant) => {
      return `
        <div class="birthday-item">
          <i class="birthday-item__icon ri-gift-line"></i>

          <div class="birthday-item__info">
            <strong>${participant.name}</strong>
            <span>${participant.birthday.replace(" / ", " ")}</span>
          </div>

          <span class="birthday-item__amount">
            ${formatMoney(participant.goal)}
          </span>
        </div>
      `;
    })
    .join("");
}

function renderDeliveredGifts() {
  if (deliveredGifts.length === 0) {
    deliveredGiftsList.innerHTML = `
      <div class="gift-item">
        <i class="gift-item__icon ri-inbox-line"></i>

        <div class="gift-item__info">
          <strong>Sin regalos entregados</strong>
          <span>Aún no hay registros</span>
        </div>

        <span class="gift-item__amount">
          $0
        </span>
      </div>
    `;

    return;
  }

  deliveredGiftsList.innerHTML = deliveredGifts
    /*.map((gift) =>*/ 
    .slice(-3)
    .reverse()
    .map((gift) => {
      return `
        <div class="gift-item">
          <i class="gift-item__icon ri-checkbox-circle-line"></i>

          <div class="gift-item__info">
            <strong>${gift.name}</strong>
            <span>${gift.date}</span>
          </div>

          <span class="gift-item__amount">
            ${formatMoney(gift.amount)}
          </span>
        </div>
      `;
    })
    .join("");
}

function renderDashboard() {
  const totalPaid = getTotalPaid();
  const goal = getGroupGoal();
  const pending = getPendingAmount();
  const progress = getGeneralProgress();

  dashboardParticipants.textContent = participants.length;
  dashboardGoal.textContent = formatMoney(goal);
  dashboardTotalPaid.textContent = formatMoney(totalPaid);
  dashboardGoalMeta.textContent = `Meta: ${formatMoney(goal)}`;
  dashboardPending.textContent = formatMoney(pending);
  dashboardAvailable.textContent = formatMoney(getAvailableFund());

  dashboardProgressPercent.textContent = `${progress}%`;
  dashboardProgressBar.style.width = `${progress}%`;
  dashboardProgressPaid.textContent = `Ahorrado: ${formatMoney(totalPaid)}`;
  dashboardProgressGoal.textContent = `Meta: ${formatMoney(goal)}`;
  dashboardDeliveredGifts.textContent = formatMoney(getTotalDeliveredGifts());
}

renderDashboard();
renderUpcomingBirthdays();
renderDeliveredGifts();