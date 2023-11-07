import { Element } from "../Element.js";
import { buildMonthDates, buildMonthDays } from "../../utils/calendar.js";

class CalendarWeeks extends Element {
  constructor({ parent, tagName, className, styles, days }) {
    super({
      parent,
      tagName,
      className,
      styles,
    });
    this.styles = styles;
    this.li = [];
    this.containWeeks(days);
  }

  containWeeks = (days) => {
    days.forEach(
      ({ date, options }) => {
        const { isActiveMonth, isCurrentDay, isWeekend } = options;
        this.li.push(
          new Element({
            parent: this.node,
            tagName: "li",
            className: "calendar__day",
            content: date.getDate(),
            styles: {
              ...this.styles.day,
              ...(isWeekend && this.styles.day.weekend),
              ...(isCurrentDay && this.styles.day.currentDay),
              ...(isActiveMonth && this.styles.day.activeMonth),
              ...(isActiveMonth && isWeekend && this.styles.day.activeMonth.weekend),
              ...(isActiveMonth && isCurrentDay && this.styles.day.activeMonth.currentDay),
            },
          })
        );
      }
    );
  };

  updateWeeks = (days) => {
    this.li.forEach((li) => li.destroy());
    this.li = [];
    this.containWeeks(days);
  };
}

export { CalendarWeeks };
