import { Element } from "../Element.js";
import { CalendarButtons } from "./CalendarButtons.js";
import { CalendarList } from "./CalendarList.js";
import { styles } from "./style.js";

class Calendar extends Element {
  constructor({ parent, className, content, controller, month }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__calendar calendar`,
      styles,
    });

    this.calendarList = new CalendarList({
      parent: this.node,
      className: "calendar",
      styles: styles,
      content,
      month,
    });
    this.calendarButtons = new CalendarButtons({
      parent: this.node,
      className: "calendar",
      styles: styles.buttons,
      content: content.buttons,
      controller,
    });
  }

  updateDate = (date) => {};
  updateSwipingSteps = ({ direction, month }) => {
    if (direction === "next") {
      this.calendarList.swipeToRight(
        month,
        this.calendarButtons.removeDisabled
      );
      return;
    }

    this.calendarList.swipeToLeft(month, this.calendarButtons.removeDisabled);
  };
}

export { Calendar };
