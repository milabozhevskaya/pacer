import { Element } from "./Element.js";
import { Rules } from "./Rules.js";
import { Textarea } from "./textarea/textarea.js";

class Main extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "main",
      className: `${className}__main main`,
    });
    this.controller = controller;
    this.container = new Element({
      parent: this.node,
      className: "main__container container",
    });
    this.title = new Element({
      parent: this.container.node,
      tagName: "h1",
      className: "main__title title",
      content: content.title,
    });

    this.textarea = new Textarea(
      this.container.node,
      controller.changeTextareaText
    );

    this.rules = new Rules({
      parent: this.container.node,
      className: "main",
      content: content.rules,
    });
  }

  updateTextareaText = (text) => this.textarea.update(text);
}

export { Main };
