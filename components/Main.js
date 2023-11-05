import { Element } from "./Element.js";
import { NoteSection } from "./noteSaction/NoteSection.js";
import { Rules } from "./rules/Rules.js";
import { Notes } from "./notes/Notes.js";

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
    this.notes = new Notes({
      parent: this.container.node,
      className: "main",
      controller: controller,
      content: content.notes,
    });
    this.textarea = new NoteSection({
      parent: this.container.node,
      className: "main",
      content: content.textarea,
      controller: controller.changeTextareaText,
      key: "textarea",
    });
    this.rules = new Rules({
      parent: this.container.node,
      className: "main",
      content: content.rules,
    });
  }

  updateTextareaText = (text) => this.textarea.update(text);
  updateEndeavorText = (text) => this.notes.updateEndeavorText(text);
  updateActionText = (text) => this.notes.updateActionText(text);
  updateActionMode = (mode) => this.notes.updateActionMode(mode);
  updateQuestText = (text) => this.notes.updateQuestText(text);
}

export { Main };
