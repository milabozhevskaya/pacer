import { Element } from "../Element.js";
import { List } from "../List/List.js";
import { Button } from "../button/Button.js";
import { Textarea } from "../textarea/Textarea.js";
import { styles } from "./style.js";

class EndeavorSection extends Element {
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
      content: content.buttons.mode[mode],
      styles: styles.button,
      controller: () => controller.changeEndeavorMode(this.changeMode()),
    });
    this.textarea = new Textarea(null, (text) =>
      controller.changeTextareaText(key, text)
    );
    this.list = new List({
      parent: null,
      changeText: (text) => controller.changeTextareaText(key, text),
      buttons: content.list.buttons,
    });
    this.activeChild = this.mode === "text" ? this.textarea : this.list;
    this.node.append(this.activeChild.node);
  }

  changeMode = () => (this.mode === "text" ? "list" : "text");

  updateText = (text, reinit = "") => {
    this.text = text;
    this.textarea.update(text);
    this.list.update(text);
  };

  updateMode = (mode) => {
    this.mode = mode;
    if (this.mode === "text") {
      this.list.removeEditMode();
    }
    this.button.updateText(this.content.buttons.mode[mode]);
    this.activeChild.destroy();
    this.activeChild = this.mode === "text" ? this.textarea : this.list;
    this.node.append(this.activeChild.node);
    if (this.mode !== "text") {
      this.textarea.update(this.list.getContent());
    }
  };
}

export { EndeavorSection };
