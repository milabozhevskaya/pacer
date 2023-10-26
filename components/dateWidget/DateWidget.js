import { Element } from "../Element.js";
import { Button } from "../button/Button.js";
import { Calendar } from "../calendar/Calendar.js";
import { styles } from "./style.js";

class DateWidget extends Element {
  constructor({ parent, className, content, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__date-widget date-widget`,
      styles,
    });
    this.time = new Element({
      parent: this.node,
      tagName: "date",
      className: "date-widget__time",
      styles: styles.time,
    });
    this.button = new Button({
      parent: this.node,
      className: "date-widget__button",
      content: content.button,
      controller: (event) => {
        event.stopPropagation();
        controller.openCalendar();
      },
      styles: styles.button,
    });
    this.calendar = null;
    this.popupStyles = styles.popup;
    this.calendarContent = content.calendar;
    this.swipeCalendar = controller.setCalendarSwipingSteps;
  }

  updateTime = (time) => this.time.updateContent(time);
  openCalendar = (popup) => {
    this.calendar = new Calendar({
      className: "date-widget__calendar calendar",
      content: this.calendarContent,
      controller: this.swipeCalendar,
    });
    popup.setContent(this.calendar);
    popup.addStyles(this.popupStyles);
    popup.append(this.node);
  };

  closeCalendar = () => {
    this.calendar = null;
  };
  updateCalendarSwipingSteps = (steps) =>
    this.calendar?.updateSwipingSteps(steps);
}

export { DateWidget };
