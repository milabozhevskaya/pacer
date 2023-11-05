import { Element } from "../Element.js";
import { Textarea } from "../textarea/Textarea.js";
import { styles } from "./style.js";

class NoteSection extends Element {
  constructor({ parent, className, content, key, controller }) {
    super({ parent, tagName: "div", className: `${className}__note note note--${key}`, styles });
    this.key = key;
    this.title = new Element({ parent: this.node, tagName: "h2", className: "note__title", content: content.title, styles: styles.title });
    this.textarea = new Textarea(this.node, (text) => controller.changeTextareaText(key, text));
  }

  update = (text) => this.textarea.update(text);
}

export { NoteSection };
