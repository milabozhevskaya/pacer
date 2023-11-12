import { Element } from "../Element.js";
import { NoteSection } from "../noteSaction/NoteSection.js";
import { ActionSection } from "../ActionSection/ActionSection.js";
import { styles } from "./style.js";

class Notes extends Element {
  constructor({ parent, className, controller, content, notes }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__notes notes`,
      styles,
    });
    notes.forEach((note) => {
      if (note === "action") {
        this.action = new ActionSection({
          parent: this.node,
          className: "notes",
          controller,
          content: content.action,
          key: "action",
          mode: "text",
        });
      } else {
        this[note] = new NoteSection({
          parent: this.node,
          className: "notes",
          controller,
          content: content[note],
          key: note,
        });
      }

      Object.assign(this[note].node.style, styles.note);
    });
  }

  updateEndeavorText = (text) => this.endeavor.update(text);
  updateActionText = (text) => this.action.updateText(text);
  updateActionMode = (mode) => this.action.updateMode(mode);
  updateLogText = (text) => this.log.update(text);
  updateQuestText = (text) => this.quest.update(text);
  updateNoteText = (text) => this.note.update(text);
  updateTodoText = (text) => this.todo.update(text);
}

export { Notes };
