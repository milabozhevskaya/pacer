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
    this.styles = styles;
    this.lis = [];
    this.containWeeks(today);
  }

  containWeeks = (today) => {
    const isMonth =
      new Date().getFullYear() === today.getFullYear() &&
      new Date().getMonth() === today.getMonth();
    const dates = buildMonthDates(today);
    const prevMonthDays = buildMonthDays(dates.prevMonth, today, false);
    const monthDays = buildMonthDays(dates.currentMonth, today, true);
    const nextMonthDays = buildMonthDays(dates.nextMonth, today, false);
    [...prevMonthDays, ...monthDays, ...nextMonthDays].forEach(
      ({ date, options }) => {
        const { isCurrentMonth, isCurrentDay, isWeekend } = options;
        this.lis.push(
          new Element({
            parent: this.node,
            tagName: "li",
            className: "calendar__day",
            content: date.getDate(),
            styles: {
              ...this.styles.day,
              ...(isCurrentMonth && this.styles.day.currentMonth),
              ...(isCurrentMonth && isWeekend && this.styles.day.weekend),
              ...(isCurrentDay && isMonth && this.styles.day.currentDay),
            },
          })
        );
      }
    );
  };

  updateWeeks = (today) => {
    this.lis.forEach((li) => li.destroy());
    this.lis = [];
    this.containWeeks(today);
  };
}

export { CalendarWeeks };
