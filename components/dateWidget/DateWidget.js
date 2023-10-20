import { Element } from "../Element.js";
import { Button } from "../button/Button.js";
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
  }
  
  updateTime = (time) => this.time.updateContent(time);
}

export { DateWidget };
