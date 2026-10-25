# Ternopil – Pidhorodne bus timetable

## Вихідний графік — 25 жовтня 2026

У суботу та неділю за київським часом використовується окремий список із 12 відправлень з Тернополя, наданий власником сайту. Дані містяться у `weekend-timetable.js`: час виїзду, автовокзал, маршрут, перевізник та тип автобуса, якщо він вказаний. Для цих рейсів не застосовуються старі поправки часу від АС-2 до проміжних зупинок. Зворотний графік на вихідні не надано — інтерфейс показує повідомлення про уточнення замість будніх рейсів. Початкові масиви розкладу збережені для буднів. Дані незалежно у перевізників не перевірялися.

Публікація потребує також `weekend-timetable.js` разом з `index.html` та `design.css`.

**Live page:** https://endrymagolas-wq.github.io/pidhorodne-bus/

A timetable you can actually use, for the bus between Ternopil and Pidhorodne, the village the author is from. Pick a direction and a stop, filter by route, see the countdown to the next departure and export a trip to your calendar. Works as a small installable web app on a phone.

## Розклад автобусів Тернопіль — Підгородне

Напрямок, зупинка, фільтр маршрутів, відлік до наступного автобуса і експорт у календар. Сторінку можна додати на головний екран телефона.

## What is and is not here

- Static HTML, CSS and JavaScript on GitHub Pages. No build step, no backend.
- The timetable is the published schedule, copied as is. The page does not track buses live, and the schedule has not been re-verified with the operator.
- Live passenger reports, driver updates and the Telegram bot from the original project are not part of this public version. No Python code, credentials or private history are published.
