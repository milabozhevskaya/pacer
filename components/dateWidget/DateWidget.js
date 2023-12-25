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
    this.curentTime = "";
    this.content = content;
    this.timeDisplay = new Element({
      parent: this.node,
      tagName: "div",
      className: "date-widget__time-display",
      styles: styles.timeDisplay,
    });
    this.time = new Element({
      parent: this.timeDisplay.node,
      tagName: "div",
      className: "date-widget__time",
      styles: styles.time,
    });
    this.inputTime = new Element({
      parent: this.timeDisplay.node,
      tagName: "input",
      className: "date-widget__time-input",
      styles: styles.timeInput,
    });
    this.inputTime.node.onchange = (event) =>
      controller.changeManualTime(event.target.value);
    this.inputTime.node.type = "date";
    this.changeTimeButton = new Button({
      parent: this.node,
      className: "date-widget__change-time-button",
      content: content.changeTimeButton,
      controller: () => this.setManualTime,
      styles: styles.changeTimeButton,
    });
    this.timeModeButton = new Button({
      parent: this.node,
      className: "date-widget__time-mode-button",
      content: content.autoTimeModeButton,
      controller: controller.changeTimeMode,
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
    this.updateTimeMode("auto");
  }

  updateTime = (time) => {
    this.curentTime = time;
    this.time.updateContent(time);
  };
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
  updateTimeMode = (timeMode) => {
    if (timeMode === "auto") {
      this.timeModeButton.updateText(this.content.autoTimeModeButton);
      this.timeModeButton.node.title = this.content.autoTimeModeButtonTitle;
      this.changeTimeButton.node.style.display = "none";
      this.inputTime.node.value = "";
      this.inputTime.node.style.display = "none";
      this.time.node.style.display = "flex";
      return;
    }
    this.timeModeButton.updateText(this.content.manualTimeModeButton);
    this.timeModeButton.node.title = this.content.manualTimeModeButtonTitle;
    this.changeTimeButton.node.style.display = "block";
    this.inputTime.node.style.display = "flex";
    this.inputTime.node.value = this.curentTime.slice(0, 10);
    this.time.node.style.display = "none";
  };
}

export { DateWidget };
