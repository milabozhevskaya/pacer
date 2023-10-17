import { Element } from "./Element.js";

class Rules extends Element {
  constructor({ parent, className, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__rules rules`,
    });
    this.title = new Element({
      parent: this.node,
      tagName: "h2",
      className: "rules__title",
      content: content.title,
    });
    this.text = new Element({
      parent: this.node,
      tagName: "div",
      className: "rules__text",
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
