import { Element } from "./Element.js";
import { NoteSection } from "./noteSaction/NoteSection.js";
import { Rules } from "./rules/Rules.js";
import { Notes } from "./notes/Notes.js";
import { SavingButton } from "./SavingButton/SavingButton.js";

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
    this.firstLineNotes = new Notes({
      parent: this.container.node,
      className: "main",
      controller: controller,
      content: content.notes,
      notes: ["note", "quest", "todo"],
    });
    this.secondLineNotes = new Notes({
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
    this.savingButton = new SavingButton({
      parent: this.container.node,
      className: "main",
      controller: controller,
      content: content.savingButton,
    });
  }

  updateEndeavorText = (text) => this.secondLineNotes.updateEndeavorText(text);
  updateActionText = (text) => this.secondLineNotes.updateActionText(text);
  updateActionMode = (mode) => this.secondLineNotes.updateActionMode(mode);
  updateLogText = (text) => this.secondLineNotes.updateLogText(text);

  updateNoteText = (text) => this.firstLineNotes.updateNoteText(text);
  updateQuestText = (text) => this.firstLineNotes.updateQuestText(text);
  updateTodoText = (text) => this.firstLineNotes.updateTodoText(text);
}

export { Main };
