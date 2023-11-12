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
    this.topNotes = new Notes({
      parent: this.container.node,
      className: "main",
      controller: controller,
      content: content.notes,
      notes: ["note", "quest", "todo"],
    });
    this.downNotes = new Notes({
      parent: this.container.node,
      className: "main",
      controller: controller,
      content: content.notes,
      notes: ["endeavor", "action", "log"],
    });
    this.rules = new Rules({
      parent: this.container.node,
      className: "main",
      content: content.rules,
    });
  }

  updateEndeavorText = (text) => this.downNotes.updateEndeavorText(text);
  updateActionText = (text) => this.downNotes.updateActionText(text);
  updateActionMode = (mode) => this.downNotes.updateActionMode(mode);
  updateLogText = (text) => this.downNotes.updateLogText(text);

  updateNoteText = (text) => this.topNotes.updateNoteText(text);
  updateQuestText = (text) => this.topNotes.updateQuestText(text);
  updateTodoText = (text) => this.topNotes.updateTodoText(text);
}

export { Main };
