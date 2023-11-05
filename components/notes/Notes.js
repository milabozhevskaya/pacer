import { Element } from "../Element.js";
import { NoteSection } from "../noteSaction/NoteSection.js";
import { ActionSection } from "../ActionSection/ActionSection.js";
import { styles } from "./style.js";

class Notes extends Element {
  constructor({ parent, className, controller, content }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__notes notes`,
      styles,
    });
    this.endeavor = new NoteSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.endeavor,
      key: "endeavor",
    });
    this.action = new ActionSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.action,
      key: "action",
      mode: 'table',
    });
    this.quest = new NoteSection({
      parent: this.node,
      className: "notes",
      controller,
      content: content.quest,
      key: "quest",
    });

    Object.assign(this.endeavor.node.style, styles.note);
    Object.assign(this.action.node.style, styles.note);
    Object.assign(this.quest.node.style, styles.note);
  }

  updateEndeavorText = (text) => this.endeavor.update(text);
  updateActionText = (text) => this.action.update(text);
  updateQuestText = (text) => this.quest.update(text);
}

export { Notes };
