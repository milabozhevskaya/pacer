import { Element } from "../Element.js";
import { NoteSection } from "../noteSaction/NoteSection.js";
import { ActivitySection } from "../ActivitySection/ActivitySection.js";
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
      if (note === "activity") {
        this.activity = new ActivitySection({
          parent: this.node,
          className: "notes",
          controller,
          content: content.activity,
          key: "activity",
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

  updateEndeavors = (text) => this.endeavor.update(text);
  updateActivitiesText = (text, reinit = "") =>
    this.activity.updateText(text, reinit);
  updateActivitiesMode = (mode) => this.activity.updateMode(mode);
  updateLogs = (text) => this.log.update(text);
  updateQuests = (text) => this.quest.update(text);
  updateNotes = (text) => this.note.update(text);
  updateTodos = (text) => this.todo.update(text);
}

export { Notes };
