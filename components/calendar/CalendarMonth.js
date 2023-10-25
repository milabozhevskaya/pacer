import { Element } from "../Element.js";
import { CalendarTop } from "./CalendarTop.js";
import { CalendarDays } from "./CalendarDays.js";
import { CalendarWeeks } from "./CalendarWeeks.js";

class CalendarMonth extends Element {
  constructor({ parent, className, content, styles, today }) {
    super({
      parent,
      tagName: "li",
      className: `${className}__month`,
      styles: styles.month,
    });
    this.content = content;
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

  updateMonth = (today) => {
    this.top.updateContent(
      this.content.month[today.getMonth()],
      today.getFullYear()
    );
    this.weeks.updateWeeks(today);
  };
}

export { CalendarMonth };
