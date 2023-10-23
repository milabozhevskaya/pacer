import { Element } from "../Element.js";
import { NoteSection } from "../noteSaction/NoteSection.js";

class Notes extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__notes notes`,
    });
    this.endeavor = new NoteSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.endeavor,
      key: "endeavor",
    });
    this.action = new NoteSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.action,
      key: "action",
    });
    this.quest = new NoteSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.quest,
      key: "quest",
    });
  }

  updateEndeavorText = (text) => this.endeavor.update(text);
  updateActionText = (text) => this.action.update(text);
  updateQuestText = (text) => this.quest.update(text);
}

export { Notes };
