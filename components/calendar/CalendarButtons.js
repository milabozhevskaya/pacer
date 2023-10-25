import { Element } from "../Element.js";

class CalendarButtons extends Element {
  constructor({ parent, className, content, styles, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__buttons`,
      styles,
    });
    this.prevButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: {...styles.button, ...styles.prev},
      content: content.button.prev,
    });
    this.nextButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: {...styles.button, ...styles.next},
      content: content.button.next,
    });
    this.prevButton.node.onmouseover = () => {
      Object.assign(this.prevButton.node.style, styles.button.hover);
    };
    this.prevButton.node.onmouseleave = () => {
      Object.assign(this.prevButton.node.style, styles.button.leave);
    };
    this.nextButton.node.onmouseover = () => {
      Object.assign(this.nextButton.node.style, styles.button.hover);
    };
    this.nextButton.node.onmouseleave = () => {
      Object.assign(this.nextButton.node.style, styles.button.leave);
    };
  }
}

export { CalendarButtons };
