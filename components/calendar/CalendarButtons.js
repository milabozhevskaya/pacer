import { Element } from "../Element.js";

class CalendarButtons extends Element {
  constructor({ parent, className, content, styles, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__buttons`,
      styles,
    });
    this.leftButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: {...styles.button, ...styles.left},
      content: content.button.left,
    });
    this.rightButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: {...styles.button, ...styles.right},
      content: content.button.right,
    });
  }
}

export { CalendarButtons };
