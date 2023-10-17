import { Element } from "../Element.js";
import { styles } from "./style.js";

class Rules extends Element {
  constructor({ parent, className, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__rules rules`,
      styles,
    });
    this.title = new Element({
      parent: this.node,
      tagName: "h2",
      className: "rules__title",
      content: content.title,
      styles: styles.title,
    });
    this.text = new Element({
      parent: this.node,
      tagName: "div",
      className: "rules__text",
      styles: styles.text,
    });
    content.text.forEach((p) => {
      const paragraph = new Element({
        parent: this.text.node,
        tagName: "p",
        content: p,
      });
    });
  }
}

export { Rules };
