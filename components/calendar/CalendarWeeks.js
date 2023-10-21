import { Element } from "../Element.js";
import { buildMonthDates, buildMonthDays } from "../../utils/calendar.js";

class CalendarWeeks extends Element {
  constructor({ parent, tagName, className, styles, today }) {
    super({
      parent,
      tagName,
      className,
      styles,
    });
    const dates = buildMonthDates(today);
    this.prevMonthDays = buildMonthDays(dates.prevMonth, today, false);
    this.monthDays = buildMonthDays(dates.currentMonth, today, true);
    this.nextMonthDays = buildMonthDays(dates.nextMonth, today, false);
    [...this.prevMonthDays, ...this.monthDays, ...this.nextMonthDays].forEach(
      ({ date, options }) => {
        const { isCurrentMonth, isCurrentDay, isWeekend } = options;
        new Element({
          parent: this.node,
          tagName: "li",
          className: "calendar__day",
          content: date.getDate(),
          styles: {
            ...styles,
            ...(isCurrentDay && styles.currentDay),
            ...(isCurrentMonth && styles.currentMonth),
            ...(isWeekend && styles.weekend),
          },
        });
      }
    );
  }
}

export { CalendarWeeks };
