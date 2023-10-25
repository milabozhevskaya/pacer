import { Element } from "../Element.js";

class CalendarButtons extends Element {
  constructor({ parent, className, content, styles, controller }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__buttons`,
      styles,
    });
    this.styles = styles;
    this.prevButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: { ...styles.button, ...styles.prev },
      content: content.button.prev,
    });
    this.nextButton = new Element({
      parent: this.node,
      tagName: "button",
      className: "calendar__button",
      styles: { ...styles.button, ...styles.next },
      content: content.button.next,
    });
    this.isDisabled = false;
    this.prevButton.node.onclick = () => {
      if (this.isDisabled) return;
      this.prevButton.node.disabled = true;
      this.isDisabled = "prev";
      Object.assign(this.prevButton.node.style, styles.button.disabled);
      controller(-1);
    };
    this.nextButton.node.onclick = (e) => {
      if (this.isDisabled) return;
      this.nextButton.node.disabled = true;
      this.isDisabled = "next";
      Object.assign(this.nextButton.node.style, styles.button.disabled);
      controller(1);
    };
    this.prevButton.node.onmouseover = () => {
      if (this.isDisabled) return;

      Object.assign(this.prevButton.node.style, styles.button.hover);
    };
    this.prevButton.node.onmouseleave = () => {
      if (this.isDisabled) return;

      Object.assign(this.prevButton.node.style, styles.button.leave);
    };
    this.nextButton.node.onmouseover = () => {
      if (this.isDisabled) return;

      Object.assign(this.nextButton.node.style, styles.button.hover);
    };
    this.nextButton.node.onmouseleave = () => {
      if (this.isDisabled) return;

      Object.assign(this.nextButton.node.style, styles.button.leave);
    };
  }

  removeDisabled = () => {
    if (!this.isDisabled) return;
    if (this.isDisabled === "prev") {
      Object.assign(this.prevButton.node.style, this.styles.button.undisabled);
      this.prevButton.node.disabled = false;
    }
    if (this.isDisabled === "next") {
      Object.assign(this.nextButton.node.style, this.styles.button.undisabled);
      this.nextButton.node.disabled = false;
    }
    this.isDisabled = false;
  };
}

export { CalendarButtons };
