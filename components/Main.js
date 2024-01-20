import { Element } from "./Element.js";
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
      notes: ["endeavor", "activity", "log"],
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

  updateEndeavors = (text) => this.secondLineNotes.updateEndeavorsText(text);
  updateEndeavorMode = (mode) => this.secondLineNotes.updateEndeavorMode(mode);
  updateActivities = (text, reinit = "") =>
    this.secondLineNotes.updateActivitiesText(text, reinit);
  updateActivitiesMode = (mode) =>
    this.secondLineNotes.updateActivitiesMode(mode);
  updateLogs = (text) => this.secondLineNotes.updateLogs(text);

  updateNotes = (text) => this.firstLineNotes.updateNotes(text);
  updateQuests = (text) => this.firstLineNotes.updateQuests(text);
  updateTodos = (text) => this.firstLineNotes.updateTodos(text);
}

export { Main };
