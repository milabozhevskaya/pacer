import { Element } from "../Element.js";
import { Button } from "../button/Button.js";
import { styles } from "./style.js";

class Calendar extends Element {
  constructor({ parent, className, content, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__calendar calendar`,
      styles,
    });
    this.time = new Element({
      parent: this.node,
      tagName: "date",
      className: "calendar__date",
      styles: styles.time,
    });
    this.button = new Button({
      parent: this.node,
      className: "calendar__button",
      content: content.button,
      controller,
      styles: styles.button,
    });
  }
  
  updateTime = (time) => this.time.updateContent(time);
}

export { Calendar };
