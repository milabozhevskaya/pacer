import { Element } from "../Element.js";
import { buttonStyles } from "./style.js";

class Button extends Element {
  constructor({
    parent,
    className = "",
    controller = () => ({}),
    content = "",
    styles = {},
  }) {
    super({
      parent,
      tagName: "button",
      className: `${className} button`,
      styles: buttonStyles,
    });
    this.styles = styles;
    this.span = new Element({
      parent: this.node,
      tagName: "span",
      content,
      styles: buttonStyles.span,
    });
    Object.assign(this.node.style, styles);
    Object.assign(this.span.node.style, styles.span);

    this.isDisable = false;
    this.isWaiting = false;
    this.node.onmouseover = () => {
      if (this.isDisable || this.isWaiting) return;

      Object.assign(this.node.style, buttonStyles.hover);
    };
    this.node.onmouseleave = () => {
      if (this.isDisable || this.isWaiting) return;

      Object.assign(this.node.style, buttonStyles);
      Object.assign(this.node.style, styles);
    };

    this.node.onclick = (event) => {
      if (this.isDisable || this.isWaiting) return;

      controller(event);
    };
  }

  updateText = (text) => {
    this.span.updateContent(text);
  };
  setDisableStyle = (disableStyles) => {
    this.isDisable = true;
    Object.assign(this.node.style, disableStyles);
  };
  removeDisableStyle = () => {
    this.isDisable = false;
    Object.assign(this.node.style, buttonStyles);
  };
  setWaitingStyle = (waitingStyles) => {
    if (this.isDisable) return;
    this.isWaiting = true;
    Object.assign(this.node.style, waitingStyles);
  };
  removeWaitingStyle = () => {
    if (this.isDisable) return;
    this.isWaiting = false;
    Object.assign(this.node.style, buttonStyles);
  };
  setDefaultStyle = () => {
    this.isDisable = false;
    this.isWaiting = false;
    Object.assign(this.node.style, buttonStyles);
  };
}

export { Button };
