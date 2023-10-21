import { Element } from "../Element.js";
import { buttonStyles } from "./style.js";

class Button extends Element {
  constructor({
    parent,
    className = "",
    callback = () => ({}),
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
    console.log(styles);
    Object.assign(this.node.style, styles);

    this.node.onmouseover = () => {
      Object.assign(this.node.style, buttonStyles.hover);
    };
    this.node.onmouseleave = () => {
      Object.assign(this.node.style, buttonStyles);
    };

    this.node.onclick = () => callback();
  }
}

export { Button };
