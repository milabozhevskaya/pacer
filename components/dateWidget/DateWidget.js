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
      controller,
      styles: styles.button,
    });
    this.calendar = new Calendar({
      parent: this.node,
      className: "date-widget__calendar",
      controller,
      content: content.calendar,
      styles: styles.calendar,
    });
  }
  
  updateTime = (time) => this.time.updateContent(time);
}

export { DateWidget };
