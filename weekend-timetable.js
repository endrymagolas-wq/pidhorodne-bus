// Weekend departures supplied by the site owner. Times refer to the named station,
// not to intermediate stops. No return timetable was supplied.
const weekendStations = {
  central: 'Центральний АВ · Торговиця',
  as2: 'Приміський АС-2 · Білогірська'
};
const weekendDepartures = [
  { t: '08:45', r: 'drag', station: 'central', carrier: 'ФОП Лопатинський · Mercedes' },
  { t: '09:10', r: 'zab', station: 'central', carrier: 'ФОП Лопатинський · Mercedes' },
  { t: '10:40', r: 'pidg', station: 'as2', carrier: 'ФОП Мозгаль В.І.' },
  { t: '10:55', r: 'zab', station: 'as2', carrier: 'ФОП Лопатинський · ПАЗ' },
  { t: '12:35', r: 'zab', station: 'central', carrier: 'ФОП Лопатинський · Mercedes' },
  { t: '13:10', r: 'pidg', station: 'as2', carrier: 'ФОП Мозгаль В.І.' },
  { t: '13:55', r: 'drag', station: 'central', carrier: 'ФОП Лопатинський · Mercedes' },
  { t: '15:40', r: 'pidg', station: 'as2', carrier: 'ФОП Мозгаль В.І.' },
  { t: '16:10', r: 'zab', station: 'as2', carrier: 'ФОП Лопатинський · ПАЗ' },
  { t: '17:25', r: 'pidg', station: 'as2', carrier: 'ФОП Мозгаль В.І.' },
  { t: '17:45', r: 'drag', station: 'as2', carrier: 'ФОП Лопатинський · Mercedes' },
  { t: '19:00', r: 'drag', station: 'central', carrier: 'ФОП Лопатинський · Mercedes' }
];

function isWeekendTimetable(date = getKyivNow()) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function getWeekendDepartures() {
  if (curDir !== 'to-pidg') return [];
  return weekendDepartures.filter(trip => selectedRoutes.size === 0 || selectedRoutes.has(trip.r));
}

function renderWeekendHero() {
  const active = isWeekendTimetable();
  const restoreStops = document.getElementById('stop-section').hidden && !active;
  document.getElementById('hero-card').hidden = active;
  document.getElementById('weekend-hero').hidden = !active;
  document.getElementById('stop-section').hidden = active;
  if (restoreStops) renderStops();
  if (!active) return false;

  const now = getKyivNow();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const list = getWeekendDepartures();
  const next = list.find(trip => toMin(trip.t) >= minutes);
  const panel = document.getElementById('weekend-hero');
  if (curDir === 'to-tern') {
    panel.innerHTML = '<p class="field-label">Субота та неділя</p><h2>Зворотний графік уточнюється</h2><p>Час відправлення з Підгородного на вихідних ще не надано. Уточніть рейс у перевізника.</p>';
  } else if (next) {
    const diff = toMin(next.t) - minutes;
    panel.innerHTML = `<p class="field-label">Найближче відправлення · субота та неділя</p>
      <div class="weekend-time">${next.t}</div><h2>Тернопіль → ${routes[next.r].name}</h2>
      <p>${diff === 0 ? 'Відправлення зараз' : `До відправлення ${diff} хв`} · київський час</p>
      <p><strong>${weekendStations[next.station]}</strong><br>${next.carrier}</p>`;
  } else {
    panel.innerHTML = `<p class="field-label">Субота та неділя</p><h2>${list.length ? 'Рейси на сьогодні завершено' : 'Немає наданих рейсів'}</h2>
      <p>${list.length ? 'Усі відправлення на вихідні наведено в розкладі.' : 'Для вибраного маршруту вихідний графік не надано. Спробуйте обрати інший маршрут.'}</p>`;
  }
  document.getElementById('schedule-day').textContent = 'Субота та неділя';
  return true;
}

function renderWeekendSchedule() {
  if (!isWeekendTimetable()) return false;
  const container = document.getElementById('schedule-container');
  if (curDir === 'to-tern') {
    container.innerHTML = '<p class="weekend-note">Розклад з Підгородного на суботу та неділю уточнюється. Будні години тут не застосовуються.</p>';
    return true;
  }
  const list = getWeekendDepartures();
  const now = getKyivNow();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const next = list.find(trip => toMin(trip.t) >= minutes);
  container.innerHTML = `<p class="weekend-note">Час виїзду саме з указаного автовокзалу. Час на проміжних зупинках не надано. Графік на суботу й неділю надано власником сайту.</p>
    <div class="weekend-list">${list.map(trip => `<article class="weekend-trip ${trip === next ? 'current' : ''}">
      <div class="weekend-trip-heading"><time>${trip.t}</time><span>${routes[trip.r].name}</span></div>
      <p class="weekend-station">${weekendStations[trip.station]}</p><p>${trip.carrier}</p>
      ${toMin(trip.t) < minutes ? '<span class="weekend-past">Час відправлення минув</span>' : ''}
    </article>`).join('')}</div>${list.length ? '' : '<p class="weekend-note">Для вибраного маршруту графік на вихідні не надано.</p>'}`;
  return true;
}
