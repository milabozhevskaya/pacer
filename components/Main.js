import { Element } from "./Element.js";
import { NoteSection } from "./noteSaction/NoteSection.js";
import { Rules } from "./rules/Rules.js";
import { Textarea } from "./textarea/Textarea.js";

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
    this.notes = new Element({
      parent: this.container.node,
      className: "main__notes",
      tagName: "div",
    });
    this.endeavor = new NoteSection({
      parent: this.notes.node,
      className: "main",
      callback: controller.changeTextareaText,
      content: content.notes.endeavor,
      key: "endeavor",
    });
    this.action = new NoteSection({
      parent: this.notes.node,
      className: "main",
      callback: controller.changeTextareaText,
      content: content.notes.action,
      key: "action",
    });
    this.quest = new NoteSection({
      parent: this.notes.node,
      className: "main",
      callback: controller.changeTextareaText,
      content: content.notes.quest,
      key: "quest",
    });
    this.textarea = new NoteSection({
      parent: this.container.node,
      className: "main",
      content: content.textarea,
      callback: controller.changeTextareaText,
      key: "textarea",
    });
    this.rules = new Rules({
      parent: this.container.node,
      className: "main",
      content: content.rules,
    });
  }

  updateTextareaText = (text) => this.textarea.update(text);
}

export { Main };
