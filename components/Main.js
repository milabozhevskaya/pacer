import { Element } from "./Element.js";
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
      content: content.title,
    });

    this.textarea = new Textarea(
      this.container.node,
      controller.changeTextareaText
    );
  }

  updateTextareaText = (text) => this.textarea.update(text);
}

export { Main };
