import { Element } from "../Element.js";
import { Table } from "../Table/Table.js";
import { Button } from "../button/Button.js";
import { Textarea } from "../textarea/Textarea.js";
import { styles } from "./style.js";

class ActionSection extends Element {
  constructor({ parent, className, content, key, controller, mode = "text" }) {
    super({
      parent,
      tagName: "div",
      className: `${className}__note note note--${key}`,
      styles,
    });
    this.key = key;
    this.mode = mode;
    this.content = content;
    this.text = "";
    this.top = new Element({
      parent: this.node,
      tagName: "div",
      className: "note__top",
      styles: styles.top,
    });
    this.title = new Element({
      parent: this.top.node,
      tagName: "h2",
      className: "note__title",
      content: content.title,
      styles: styles.title,
    });
    this.button = new Button({
      parent: this.top.node,
      className: "note__button",
      content: content.button[mode],
      styles: styles.button,
      controller: () => controller.changeActionMode(this.changeMode()),
    });
    this.textarea = new Textarea(null, (text) =>
      controller.changeTextareaText(key, text)
    );
    this.table = new Table({
      parent: null,
      controller: (text) => controller.changeTextareaText(key, text),
    });
    this.activeChild = this.mode === "text" ? this.textarea : this.table;
    this.node.append(this.activeChild.node);
  }

  changeMode = () => (this.mode === "text" ? "table" : "text");
  updateText = (text, reinit = "") => {
    this.text = text;
    this.textarea.update(text);
    if (this.mode === "text") {
      this.table.update(text);
    }
    if (reinit === "reinit" && this.mode === "table") {
      this.table.update(text);
    }
  };
  updateMode = (mode) => {
    this.mode = mode;
    this.button.updateText(this.content.button[mode]);
    this.activeChild.destroy();
    this.activeChild = this.mode === "text" ? this.textarea : this.table;
    this.node.append(this.activeChild.node);
    if (this.mode !== "text") {
      this.textarea.update(this.table.getContent());
    }
  };
}

export { ActionSection };
