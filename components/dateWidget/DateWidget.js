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
    this.timeDisplay = new Element({
      parent: this.node,
      tagName: "date",
      className: "date-widget__time-display",
      styles: styles.timeDisplay,
    });
    this.time = new Element({
      parent: this.timeDisplay.node,
      tagName: "date",
      className: "date-widget__time",
      styles: styles.time,
    });
    this.inputTime = new Element({
      parent: this.timeDisplay.node,
      tagName: "input",
      className: "date-widget__time-input",
      styles: styles.timeInput,
    });
    this.inputTime.node.type = "date";
    this.changeTimeButton = new Button({
      parent: this.node,
      className: "date-widget__change-time-button",
      content: content.changeTimeButton,
      controller: () => {},
      styles: styles.changeTimeButton,
    });
    this.timeModeButton = new Button({
      parent: this.node,
      className: "date-widget__time-mode-button",
      content: content.timeModeButton,
      controller: () => {},
      styles: styles.timeModeButton,
    });
    this.calendarButton = new Button({
      parent: this.node,
      className: "date-widget__open-calendar-button",
      content: content.calendarButton,
      controller: (event) => {
        event.stopPropagation();
        controller.openCalendar();
      },
      styles: styles.calendarButton,
    });
    this.calendar = null;
    this.popupStyles = styles.popup;
    this.calendarContent = content.calendar;
    this.swipeCalendar = controller.setCalendarSwipingSteps;
  }

  updateTime = (time) => this.time.updateContent(time);
  updateDate = (changedMonth) => this.calendar.updateDate(changedMonth);
  openCalendar = ({ popup, month }) => {
    this.calendar = new Calendar({
      className: "date-widget__calendar calendar",
      content: this.calendarContent,
      controller: this.swipeCalendar,
      month,
    });
    popup.setContent(this.calendar);
    popup.addStyles(this.popupStyles);
    popup.append(this.node);
  };

  closeCalendar = () => {
    this.calendar = null;
  };
  updateCalendarSwipingSteps = ({ direction, month }) =>
    this.calendar?.updateSwipingSteps({ direction, month });
}

export { DateWidget };
