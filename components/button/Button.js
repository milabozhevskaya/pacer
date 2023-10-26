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
    this.span = new Element({
      parent: this.node,
      tagName: "span",
      content,
      styles: buttonStyles.span,
    });
    Object.assign(this.node.style, styles);

    this.node.onmouseover = () => {
      if (this.isDisable) return;

      Object.assign(this.node.style, buttonStyles.hover);
    };
    this.node.onmouseleave = () => {
      if (this.isDisable) return;

      Object.assign(this.node.style, buttonStyles);
    };

    this.node.onclick = (event) => {
      if (this.isDisable) return;

      controller(event);
    };
  }

  setDisableStyle = (disableStyles) => {
    this.isDisable = true;
    Object.assign(this.node.style, disableStyles);
  };
  removeDisableStyle = () => {
    this.isDisable = false;
    Object.assign(this.node.style, buttonStyles);
  };
}

export { Button };
