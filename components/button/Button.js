import { Element } from "../Element.js";
import { styles } from "./style.js";

class Button extends Element {
  constructor({ parent, className = "", callback = () => ({}), content = "" }) {
    super({
      parent,
      tagName: "button",
      className: `${className} button`,
      styles,
    });
    this.span = new Element({
      parent: this.node,
      tagName: "span",
      content,
      styles: styles.span,
    });

    this.node.onmouseover = () => {
      Object.assign(this.node.style, styles.hover);
    };
    this.node.onmouseleave = () => {
      Object.assign(this.node.style, styles);
    };
    this.node.onclick = () => callback();
  }
}

export { Button };
