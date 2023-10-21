import { Element } from "../Element.js";
import { CalendarTop } from "./CalendarTop.js";
import { CalendarDays } from "./CalendarDays.js";
import { CalendarWeeks } from "./CalendarWeeks.js";
import { styles } from "./style.js";

class Calendar extends Element {
  constructor({ parent, className, content, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__calendar calendar`,
      styles,
    });
    const today = new Date();

    this.top = new CalendarTop({
      parent: this.node,
      tagName: "div",
      className: "calendar__top",
      styles: styles.top,
      month: content.month[today.getMonth()],
      year: today.getFullYear(),
    });
    this.days = new CalendarDays({
      parent: this.node,
      tagName: "ul",
      className: "calendar__days",
      content: content.days,
      styles: styles.days,
    });
    this.weeks = new CalendarWeeks({
      parent: this.node,
      tagName: "ul",
      className: "calendar__weeks",
      styles: styles.weeks,
      today,
    });
  }

  updateTime = (time) => this.time.updateContent(time);
}

export { Calendar };
