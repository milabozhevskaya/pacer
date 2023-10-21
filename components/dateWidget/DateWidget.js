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
    this.popup = new Element({
      parent: this.node,
      tagName: "div",
      className: "date-widget__popup popup",
      styles: styles.popup,
    });
    this.popupWrapper = new Element({
      parent: this.popup.node,
      tagName: "div",
      className: "popup__wrapper",
      styles: styles.popup.wrapper,
    });
    this.calendar = new Calendar({
      parent: this.popupWrapper.node,
      className: "date-widget__calendar",
      controller,
      content: content.calendar,
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
      controller,
      styles: styles.button,
    });
  }
  
  updateTime = (time) => this.time.updateContent(time);
}

export { DateWidget };
