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