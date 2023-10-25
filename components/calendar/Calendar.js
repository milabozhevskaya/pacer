import { Element } from "../Element.js";
import { CalendarButtons } from "./CalendarButtons.js";
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
    this.lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    this.nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

    this.calendarList = new CalendarList({
      parent: this.node,
      className: "calendar",
      styles: styles,
      content,
      month: [this.lastMonth, this.nowMonth, this.nextMonth],
    });
    this.calendarButtons = new CalendarButtons({
      parent: this.node,
      className: "calendar",
      styles: styles.buttons,
      content: content.buttons,
      controller,
    });
  }

  updateSwipingSteps = (steps) => {
    if (steps > 0) {
      [this.lastMonth, this.nowMonth] = [
        new Date(this.nowMonth),
        new Date(this.nextMonth),
      ];

      this.nextMonth = new Date(
        this.nextMonth.setMonth(this.nextMonth.getMonth() + 1)
      );

      this.calendarList.swipeToRight(
        this.nextMonth,
        this.calendarButtons.removeDisabled
      );
      return;
    }

    [this.nowMonth, this.nextMonth] = [
      new Date(this.lastMonth),
      new Date(this.nowMonth),
    ];

    this.lastMonth = new Date(
      this.lastMonth.setMonth(this.lastMonth.getMonth() - 1)
    );

    this.calendarList.swipeToLeft(
      this.lastMonth,
      this.calendarButtons.removeDisabled
    );
  };
}

export { Calendar };
