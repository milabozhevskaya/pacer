import { Element } from "../Element.js";
import { CalendarList } from "./CalendarList.js";
import { styles } from "./style.js";

class Calendar extends Element {
  constructor({ parent, className, content, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__calendar calendar`,
      styles,
    });
    this.today = new Date();
    this.nowMonth = new Date();
    this.lastMonth = new Date((new Date()).setMonth((new Date()).getMonth() - 1));
    this.nextMonth = new Date((new Date()).setMonth((new Date()).getMonth() + 1));

    this.calendarList = new CalendarList({
      parent: this.node,
      className: "calendar",
      styles: styles,
      content,
      today: this.nowMonth,
      last: this.lastMonth,
      next: this.nextMonth,
    });
  }

  updateCalendarSwipingSteps = (steps) => {};
}

export { Calendar };
