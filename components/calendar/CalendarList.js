import { Element } from "../Element.js";
import { CalendarMonth } from "./CalendarMonth.js";

class CalendarList extends Element {
  constructor({ parent, className, content, styles, today, last, next }) {
    super({
      parent,
      tagName: "ul",
      className: `${className}__list`,
      styles: styles.list,
    });

    this.lastMonth = new CalendarMonth({
      parent: this.node,
      className,
      styles,
      content,
      today: last,
    });

    this.nowMonth = new CalendarMonth({
      parent: this.node,
      className,
      styles,
      content,
      today,
    });

    this.nextMonth = new CalendarMonth({
      parent: this.node,
      className,
      styles,
      content,
      today: next,
    });
  }

  updateTime = (time) => this.time.updateContent(time);
  updateCalendarSwipingSteps = (steps) => {};
}

export { CalendarList };
