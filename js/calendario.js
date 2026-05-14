const calendarGrid = document.querySelector("#calendarGrid");

const calendarMonths = [
  { name: "Abril", year: 2026, cushion: true },
  { name: "Mayo", year: 2026, cushion: true },
  { name: "Junio", year: 2026, cushion: true },
  { name: "Julio", year: 2026 },
  { name: "Agosto", year: 2026 },
  { name: "Septiembre", year: 2026 },
  { name: "Octubre", year: 2026 },
  { name: "Noviembre", year: 2026 },
  { name: "Diciembre", year: 2026 },
  { name: "Enero", year: 2027 },
  { name: "Febrero", year: 2027 },
  { name: "Marzo", year: 2027 },
];

const monthNames = {
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

function isCurrentMonth(month) {
  const today = new Date();

  return (
    monthNames[month.name] === today.getMonth() &&
    month.year === today.getFullYear()
  );
}

function getBirthdayParts(birthday) {
  const [day, month, , year] = birthday.split(" ");

  return {
    day: Number(day),
    month,
    year: Number(year),
  };
}

function getParticipantsByMonth(monthName, year) {
  return participants
    .filter((participant) => {
      const birthday = getBirthdayParts(participant.birthday);

      return birthday.month === monthName && birthday.year === year;
    })
    .sort((a, b) => {
      const birthdayA = getBirthdayParts(a.birthday);
      const birthdayB = getBirthdayParts(b.birthday);

      return birthdayA.day - birthdayB.day;
    });
}

function getMonthTotal(participantsByMonth) {
  return participantsByMonth.reduce((total, participant) => {
    return total + participant.goal;
  }, 0);
}

function formatMoney(value) {
  return `$${value.toLocaleString("es-CO").replace(/,/g, "’")}`;
}

function getNextBirthday() {
  const today = new Date();

  const upcoming = participants
    .map((participant) => {
      const birthday = getBirthdayParts(participant.birthday);

      return {
        ...participant,
        birthdayDate: new Date(
          birthday.year,
          monthNames[birthday.month],
          birthday.day
        ),
      };
    })
    .filter((participant) => participant.birthdayDate >= today)
    .sort((a, b) => a.birthdayDate - b.birthdayDate);

  return upcoming[0] || null;
}

function getNextCycleBirthdays() {
  return participants
    .filter((participant) => {
      const birthday = getBirthdayParts(participant.birthday);

      return (
        birthday.year > 2027 ||
        (birthday.year === 2027 && monthNames[birthday.month] > 2)
      );
    })
    .sort((a, b) => {
      const birthdayA = getBirthdayParts(a.birthday);
      const birthdayB = getBirthdayParts(b.birthday);

      const dateA = new Date(
        birthdayA.year,
        monthNames[birthdayA.month],
        birthdayA.day
      );

      const dateB = new Date(
        birthdayB.year,
        monthNames[birthdayB.month],
        birthdayB.day
      );

      return dateA - dateB;
    });
}

function createMonthCard(month) {
  const birthdays = getParticipantsByMonth(month.name, month.year);
  const isActiveMonth = isCurrentMonth(month);
  //const nextBirthday = getNextBirthday();
  const total = getMonthTotal(birthdays);
  const yearLabel = month.year === 2027 ? ` / ${month.year}` : "";

  if (month.cushion) {
    return `
      <article class="month-card ${isActiveMonth ? "month-card--active" : ""}">
        <div class="month-card__header">
          <h2>${month.name}${yearLabel}</h2>

         ${isActiveMonth ? `<span class="month-card__badge">Actual</span>` : ""}

          <span><i class="ri-cake-2-line"></i> ${birthdays.length}</span>
        </div>

        <div class="month-card__empty">
          <i class="ri-shield-line"></i>
          <p>Mes de colchón</p>
        </div>
      </article>
    `;
  }

  return `
   <article class="month-card ${isActiveMonth ? "month-card--active" : ""}">
      <div class="month-card__header">
        <h2>${month.name}${yearLabel}</h2>

       ${isActiveMonth ? `<span class="month-card__badge">Actual</span>` : ""}

        <span><i class="ri-cake-2-line"></i> ${birthdays.length}</span>
      </div>

      <ul class="month-card__list">${birthdays

    .map((participant) => {
      const birthday = getBirthdayParts(participant.birthday);

      //const isNextBirthday =
        //nextBirthday && participant.name === nextBirthday.name;

        const isNextBirthday = false;

      return `
        <li class="${isNextBirthday ? "month-card__item--next" : ""}">
          <span>
            <strong>${String(birthday.day).padStart(2, "0")}</strong>
            ${participant.name}

            ${
              isNextBirthday
                ? `<small class="month-card__next-badge">Próximo</small>`
                : ""
            }
          </span>

          <span>${formatMoney(participant.goal)}</span>
        </li>
      `;
    })
    .join("")}
</ul>

      <div class="month-card__total">
        <span><i class="ri-gift-line"></i> Total:</span>
        <strong>${formatMoney(total)}</strong>
      </div>
    </article>
  `;
}

function createNextCycleCard() {
  const nextBirthdays = getNextCycleBirthdays();
  const total = getMonthTotal(nextBirthdays);

  if (nextBirthdays.length === 0) return "";

  return `
    <article class="month-card month-card--upcoming">
      <div class="month-card__header">
        <h2>Próximos / 2027</h2>
        <span><i class="ri-cake-2-line"></i> ${nextBirthdays.length}</span>
      </div>

      <ul class="month-card__list">
        ${nextBirthdays
          .map((participant) => {
            const birthday = getBirthdayParts(participant.birthday);

            return `
              <li>
                <span>
                  <strong>${String(birthday.day).padStart(2, "0")} ${birthday.month.toLowerCase()}</strong>
                  ${participant.name}
                </span>

                <span>${formatMoney(participant.goal)}</span>
              </li>
            `;
          })
          .join("")}
      </ul>

      <div class="month-card__total">
        <span><i class="ri-gift-line"></i> Total:</span>
        <strong>${formatMoney(total)}</strong>
      </div>
    </article>
  `;
}

function renderCalendar() {
  calendarGrid.innerHTML =
    calendarMonths.map(createMonthCard).join("") + createNextCycleCard();
}

renderCalendar();