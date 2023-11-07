function isToday(date, today) {
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function buildMonth(month) {
  const today = new Date();

  const monthDates = buildMonthDates(month);

  const monthDays = [
    ...buildMonthDays(monthDates.prevMonth, today, false),
    ...buildMonthDays(monthDates.currentMonth, today, true),
    ...buildMonthDays(monthDates.nextMonth, today, false),
  ];

  return monthDays;
}

function buildMonthDays(
  { startDate, endDate },
  currentDate,
  isActiveMonth = true
) {
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const endDay = endDate.getDate();
  const monthDays = [];

  for (let day = startDate.getDate(); day <= endDay; day++) {
    const date = new Date(year, month, day);
    const isWeekend = date.getDay() === 6 || date.getDay() === 0;
    const isCurrentDay = isToday(date, currentDate);
    const monthDay = {
      date,
      options: { isActiveMonth, isCurrentDay, isWeekend },
    };

    monthDays.push(monthDay);
  }

  return monthDays;
}

function buildMonthDates(date) {
  const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0);
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const prevDaysCount = ((monthStart.getDay() + 6) % 7) + 6;
  const earliestDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    -prevDaysCount
  );
  const nextMonthStart = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const latestDate = new Date(earliestDate);

  latestDate.setDate(earliestDate.getDate() + 55);

  return {
    prevMonth: {
      startDate: earliestDate,
      endDate: prevMonthEnd,
    },
    currentMonth: {
      startDate: monthStart,
      endDate: monthEnd,
    },
    nextMonth: {
      startDate: nextMonthStart,
      endDate: latestDate,
    },
  };
}
export { buildMonthDates, buildMonthDays, buildMonth };
